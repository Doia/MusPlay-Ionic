import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.page.html',
  styleUrls: ['./search-users.page.scss'],
})
export class SearchUsersPage implements OnInit {

  private defaultAvatar = 'assets/avatars/av-2.png';

  searchQuery: string = '';
  users: User[] = []; // Usando el tipo User en lugar de un objeto literal
  filteredUsers: User[] = [];
  searchSubject: Subject<string> = new Subject(); // Subject para el debounce

  constructor(private navCtrl: NavController, private accountService: AccountService, private imageService: ImageService) {}

  ngOnInit() {
    // Configurar el debounce de búsqueda
    this.searchSubject
      .pipe(
        debounceTime(300), // Espera 300ms después de que el usuario dejó de escribir
        distinctUntilChanged() // Ignora el mismo término consecutivamente
      )
      .subscribe(query => {
        if (query.length >= 1) {
          this.fetchFilteredUsers(query);
        } else {
          this.filteredUsers = this.users; // Restablecer si la consulta es menor de 3 caracteres
        }
      });

  }

  // Navega al perfil del usuario seleccionado
  goToUserProfile(username: string) {
    this.navCtrl.navigateForward(`/tabs/profile/${username}`);
  }

  goBack() {
    this.navCtrl.back();
  }

  onSearchChange(event: any) {
    const query = event.target.value.toLowerCase();
    this.searchSubject.next(query); // Emitir el nuevo valor para el debounce
  }

  async fetchFilteredUsers(query: string) {
    try {
      // Usa el servicio AccountService para buscar los usuarios
      const users: User[] = await this.accountService.searchUsersByText(query);

      users.forEach( async user => {
        if (!user.imageUrl || user.imageUrl == ''){
          user.imageUrl = await this.imageService.getProfileImageUrl(user.imagePath); // Actualiza la URL caché
        }
      })

      this.filteredUsers = users; // Asume que el servidor devuelve los usuarios en 'data'
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

}

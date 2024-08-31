import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { ImageService } from 'src/app/services/image.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  user: User = new User({});
  profileImageUrl: string | null = null; // Para caché de la URL de la imagen

  images: string[] = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
  ];

  constructor(
    private accountService: AccountService,
    private profileService: ProfileService,
    private uiService: UiServiceService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private router: Router
  ) {}

  ionViewWillEnter() {

    this.route.paramMap.subscribe(params => {
      const username = params.get('username');
      if (username) {
        this.loadUserProfile(username);
      } else {
        // Manejo del caso en que el parámetro no esté presente
        this.uiService.presentToast('No se pudo encontrar el perfil.');
        this.router.navigate(['/tabs/home']); // Redirige a una página por defecto si no hay nombre de usuario
      }
    });
  }

  private async loadUserProfile(username: string) {
    this.user = await this.profileService.getUserProfile(username) ?? {};

    // Solo llama a la función para obtener la imagen si no está en caché
    if (!this.profileImageUrl) {
      this.profileImageUrl = await this.imageService.getProfileImageUrl(this.user.imagePath);
    }
  }

  async actualizar(fActualizar: NgForm) {
    if (fActualizar.invalid) { return; }

    const actualizado = await this.accountService.updateUser(this.user);
    if (actualizado) {
      // Mostrar toast con el mensaje de actualizado
      this.uiService.presentToast('Registro actualizado');
    } else {
      // Mostrar toast con el error
      this.uiService.presentToast('No se pudo actualizar');
    }
  }

  logout() {
    this.accountService.logout();
  }

  goToEditProfile() {
    this.navCtrl.navigateRoot('/tabs/editProfile', { animated: true });
  }

  getProfileImageUrl() {
    return this.profileImageUrl || 'assets/avatars/av-2.png'; // Usa la URL caché o un avatar por defecto
  }
}

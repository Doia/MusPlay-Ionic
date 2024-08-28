import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.page.html',
  styleUrls: ['./search-users.page.scss'],
})
export class SearchUsersPage implements OnInit {

  searchQuery: string = '';
  users: Array<{ name: string, username: string, avatar: string }> = [];
  filteredUsers: Array<{ name: string, username: string, avatar: string }> = [];

  constructor(private navCtrl: NavController) {
    // Inicialmente, puedes poblar la lista de usuarios con datos de ejemplo.
    this.users = [
      { name: 'Diego Dominguez Martin', username: 'diegodominguezz', avatar: 'assets/avatars/av-1.png' },
      { name: 'Diego García Carrera', username: 'diegogarciacarrera', avatar: 'assets/avatars/av-2.png' },
      { name: 'Diego De Miguel', username: 'ddemiguellopez', avatar: 'assets/avatars/av-3.png' },
      // Añadir más usuarios según sea necesario
    ];

    this.filteredUsers = this.users;
  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  onSearchChange(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(query) || user.username.toLowerCase().includes(query)
    );
  }

}

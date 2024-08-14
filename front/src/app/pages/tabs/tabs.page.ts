import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  username!: string | null;

  constructor(private accountService: AccountService, private navCtrl: NavController) {}

  ngOnInit() {
    this.username = this.accountService.getUsernameFromToken(); // Obtén el ID del usuario desde el token
    console.log('User ID from token:', this.username);
  }

  // Métodos de navegación
  navigateToHome() {
    this.navCtrl.navigateForward('/tabs/home');
  }

  navigateToFeed() {
    this.navCtrl.navigateForward('/tabs/feed');
  }

  navigateToProfile() {
    this.username = this.accountService.getUsernameFromToken();
    if (this.username !== undefined) {
      this.navCtrl.navigateForward(`/tabs/profile/${this.username}`);
    } else {
      console.error('User ID is undefined, cannot navigate to profile');
    }
  }

  

}

import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  username!: string;

  constructor(private accountService: AccountService, private navCtrl: NavController) {}

  ngOnInit() {
    // this.username = this.accountService.getUsernameFromToken(); // Obtén el ID del usuario desde el token
    const username = this.accountService.userValue?.username;
    if (username == undefined){
      console.error('User USERNAME is undefined, cannot navigate to profile');
    }
    else{
      this.username = username;
    }
    console.log('User USERNAME from token:', this.username);
  }

  // Métodos de navegación
  navigateToHome() {
    this.navCtrl.navigateForward('/tabs/home');
  }

  navigateToFeed() {
    this.navCtrl.navigateForward('/tabs/feed');
  }

  navigateToProfile() {
    const username = this.accountService.userValue?.username;
    if (username == undefined){
      console.error('User USERNAME is undefined, cannot navigate to profile');
    }
    else{
      this.username = username;
    }
    if (this.username !== undefined) {
      this.navCtrl.navigateForward(`/tabs/profile/${this.username}`);
    } else {
      console.error('User ID is undefined, cannot navigate to profile');
    }
  }

  

}

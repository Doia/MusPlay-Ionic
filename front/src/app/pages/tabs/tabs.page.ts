import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  lastSelected: number = 0;
  username!: string;

  constructor(private accountService: AccountService, private navCtrl: NavController) {}


  ionViewWillEnter() {
    this.lastSelected = 0;
    const username = this.accountService.userValue?.username;
    if (username == undefined){
      console.error('User USERNAME is undefined, cannot navigate to profile');
      this.accountService.logout();
    }
    else{
      this.username = username;
    }
    console.log('User USERNAME from token:', this.username);
  }

  // Métodos de navegación
  navigateToHome() {
    this.lastSelected = 0;
    this.navCtrl.navigateForward('/tabs/home');
  }

  navigateToFeed() {
    this.lastSelected = 1;
    this.navCtrl.navigateForward('/tabs/feed');
  }

  navigateToProfile() {
    this.lastSelected = 2;
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

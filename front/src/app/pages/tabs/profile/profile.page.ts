import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  user: User = {id: '',username: '' };

  images: string[] = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
  ];

  constructor( private accountService: AccountService,
               private profileService: ProfileService,
               private uiService: UiServiceService,
               private navCtrl: NavController,
               private route: ActivatedRoute,
               private imageService : ImageService
              ) {}

  ionViewWillEnter() {
    var newUsername : string = this.route.snapshot.paramMap.get('username') ?? '';
    this.loadUserProfile(newUsername);
  }

  private async loadUserProfile(username: string) {
    this.user = await this.profileService.getUserProfile(username) ?? {};
  }


  async actualizar( fActualizar: NgForm ) {

    if ( fActualizar.invalid ) { return; }

    const actualizado = await this.accountService.updateUser( this.user );
    if ( actualizado ) {
      // toast con el mensaje de actualizado
      this.uiService.presentToast( 'Registro actualizado' );
    } else {
      // toast con el error
      this.uiService.presentToast( 'No se pudo actualizar' );
    }

  }



  logout() {
    this.accountService.logout();
  }

  goToEditProfile(){
    this.navCtrl.navigateRoot( '/tabs/editProfile', { animated: true } );
  }

  getProfileImageUrl(){
    return this.imageService.getProfileImageUrl(this.user.imagePath);
  }

}

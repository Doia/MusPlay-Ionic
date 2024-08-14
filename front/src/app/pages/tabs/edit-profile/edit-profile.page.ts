import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage {

  user: User = {};
  temporalUser: User = {};
  remainingChars = 150;
  showCharCount = false;

  constructor( private accountService: AccountService,
               private uiService: UiServiceService,
               private navCtrl: NavController,
               private profileService: ProfileService,
               //private postsService: PostsService
              ) { }

  ionViewWillEnter() {
    var username = '';
    if (this.accountService.userValue != null){
      username = this.accountService.userValue?.username ?? '';
    }
    this.loadUserProfile(username);
  }

  private async loadUserProfile(username: string) {
    this.user = await this.profileService.getUserProfile(username) ?? {};

    //Realiza una clonación profunda del objeto usando JSON
    this.temporalUser = JSON.parse(JSON.stringify(this.user)) ?? {};
  }

  async actualizar( fActualizar: NgForm ) {

    if ( fActualizar.invalid ) { return; }

    const actualizado = await this.accountService.updateUser( this.temporalUser );
    if ( actualizado ) {
      // toast con el mensaje de actualizado
      this.profileService.setUserProfile(this.temporalUser);
      this.uiService.presentToast( 'Registro actualizado' );
    } else {
      // toast con el error
      this.uiService.presentToast( 'No se pudo actualizar' );
    }

  }

  // Función para cambiar la imagen de perfil
  changeProfilePicture() {
    // Aquí implementas la lógica para cambiar la imagen de perfil
    // Por ejemplo, abrir un selector de archivos o tomar una foto
    console.log('Cambiar imagen de perfil');
  }

  updateCharacterCount() {
    const descriptionLength = this.user.description?.length || 0;
    this.remainingChars = 150 - descriptionLength;
    this.showCharCount = this.remainingChars <= 50;
  }

  logout() {
    //this.postsService.paginaPosts = 0;
    this.accountService.logout();
  }

  goToProfile(){
    var username = this.accountService.getUsernameFromToken();
    if (username !== undefined) {
      this.navCtrl.navigateBack(`/tabs/profile/${username}`);
    } else {
      console.error('User ID is undefined, cannot navigate to profile');
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { PrivacyLevel } from 'src/app/models/PrivacyLevel';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { ImageService } from 'src/app/services/image.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage {

  user: User = new User({});
  temporalUser: User = new User({});
  remainingChars = 150;
  showCharCount = false;
  profileImageUrl: string | null = null; // Agrega esta propiedad para cachear la URL de la imagen

  constructor(
    private accountService: AccountService,
    private uiService: UiServiceService,
    private navCtrl: NavController,
    private profileService: ProfileService,
    private imageService: ImageService
  ) { }

  ionViewWillEnter() {
    // Lógica para cargar el perfil del usuario
    const username = this.accountService.userValue?.username ?? '';
    this.profileImageUrl = null;
    if (username) {
      this.loadUserProfile(username);
    }
  }

  private async loadUserProfile(username: string) {
    this.user = await this.profileService.getUserProfile(username) ?? {};
    this.temporalUser = JSON.parse(JSON.stringify(this.user));

    this.profileImageUrl = await this.imageService.getProfileImageUrl(this.user.imagePath);
    

    // Establece un valor de privacidad predeterminado si no existe
    if (!this.temporalUser.privacyLevel) {
      this.temporalUser.privacyLevel = PrivacyLevel.PUBLIC;
    }
  }

  async actualizar(fActualizar: NgForm) {
    if (fActualizar.invalid) { return; }

      // Crea un objeto con solo los campos que deseas actualizar
    const updatedUserData = {
      id: this.temporalUser.id,
      username: this.temporalUser.username,
      description: this.temporalUser.description,
      name: this.temporalUser.name,
      phone: this.temporalUser.phone,
      privacyLevel: this.temporalUser.privacyLevel
    };

    const actualizado = await this.accountService.updateUser(updatedUserData);
    if (actualizado) {
      this.profileService.setUserProfile(this.temporalUser);
      this.uiService.presentToast('Registro actualizado');
    } else {
      this.uiService.presentToast('No se pudo actualizar');
    }
  }

  async changeProfilePicture() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async () => {
      const file = input.files?.item(0);
      if (file) {
        const newProfileImagePath = await this.imageService.uploadImage(file);
        if (newProfileImagePath != '') {
          this.temporalUser.imagePath = newProfileImagePath;
          this.profileImageUrl = await this.imageService.getProfileImageUrl(this.temporalUser.imagePath); // Actualiza la URL caché
          this.uiService.presentToast('Imagen de perfil actualizada');
        } else {
          this.uiService.presentToast('Error al subir la imagen');
        }
      }
    };

    input.click();
  }

  getProfileImageUrl() {
    return this.profileImageUrl || 'assets/avatars/av-2.png'; // Usa la URL caché o un avatar por defecto
  }

  updateCharacterCount() {
    const descriptionLength = this.temporalUser.description?.length || 0;
    this.remainingChars = 150 - descriptionLength;
    this.showCharCount = this.remainingChars <= 50;
  }

  logout() {
    this.accountService.logout();
  }

  goToProfile() {
    const username = this.accountService.getUsernameFromToken();
    if (username) {
      this.navCtrl.navigateBack(`/tabs/profile/${username}`);
    } else {
      console.error('User ID is undefined, cannot navigate to profile');
    }
  }
}


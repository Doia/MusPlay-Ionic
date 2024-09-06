import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Post } from 'src/app/models/post';
import { PrivacyLevel } from 'src/app/models/PrivacyLevel';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { ImageService } from 'src/app/services/image.service';
import { PostsService } from 'src/app/services/posts.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { TimeParser } from 'src/app/utils/TimeParser';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  user: User = new User({});
  profileImageUrl: string | null = null; // Para caché de la URL de la imagen
  posts: Post[] = []; // Asegúrate de definir la estructura adecuada para los posts
  habilitado: boolean = true;
  segmentValue: string = 'grid'; // Valor inicial del segmento
  isOwnProfile: boolean = false;
  page: number = 0;
  isProfilePrivate: boolean = false;

  reloaded: boolean = false;

  constructor(
    private accountService: AccountService,
    private profileService: ProfileService,
    private postsService: PostsService,
    private uiService: UiServiceService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private timeParser: TimeParser,
    private imageService: ImageService,
    private router: Router
  ) {}

  ionViewWillEnter() {

    this.page = 0;
    this.posts = [];

    this.route.paramMap.subscribe(params => {
      const username = params.get('username');
      if (username) {
        this.loadUserProfile(username);

        this.isOwnProfile = false;
        if (this.user.id == this.accountService.userValue?.id){
          this.isOwnProfile = true;
        }
      } else {
        // Manejo del caso en que el parámetro no esté presente
        this.uiService.presentToast('No se pudo encontrar el perfil.');
        this.router.navigate(['/tabs/home']); // Redirige a una página por defecto si no hay nombre de usuario
      }
    });
  }

  private async loadUserProfile(username: string) {
    this.user = await this.profileService.getUserProfile(username) ?? {};

    // Verifica la privacidad del perfil
    this.isProfilePrivate = this.user.privacyData === PrivacyLevel.PRIVATE && !this.isOwnProfile;

    // Solo llama a la función para obtener la imagen si no está en caché
    if (!this.profileImageUrl) {
      this.profileImageUrl = await this.imageService.getProfileImageUrl(this.user.imagePath);
    }

    if (!this.isProfilePrivate) {
      this.siguientes();
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

  followUser(){
    console.log("Follow USER");
  }

  shareProfile(){
    console.log("SHARE PROFILE");
  }

  async siguientes(event?: any, pull: boolean = false) {
    try {
      const resp = await this.postsService.getPostsByUserId(this.user.id, this.page);

      resp.forEach(async post => {
        if (!post.imageUrl) {
          post.imageUrl = await this.imageService.getPostImageUrl(post.imagePath); 
        }
        if (!post.owner.imageUrl) {
          post.owner.imageUrl = await this.imageService.getProfileImageUrl(post.owner.imagePath); 
        }
        if (post.comments) {
          post.comments.forEach(async comment => {
            if (!comment.owner.imageUrl) {
              comment.owner.imageUrl = await this.imageService.getProfileImageUrl(comment.owner.imagePath); 
            }
          });
        }
      });

      this.posts.push(...resp);
      this.page++;
      
      if (event) {
        event.target.complete();
        if (resp.length === 0) {
          this.habilitado = false;
        }
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
}

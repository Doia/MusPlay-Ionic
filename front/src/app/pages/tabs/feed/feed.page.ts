import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Post } from 'src/app/models/post';
import { ImageService } from 'src/app/services/image.service';
import { PostsService } from 'src/app/services/posts.service';
import { TimeParser } from 'src/app/utils/TimeParser';

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.page.html',
  styleUrls: ['feed.page.scss']
})
export class FeedPage {

  posts: Post[] = [];
  habilitado = true;

  constructor(
    private postsService: PostsService,
    private navCtrl: NavController,
    private imageService: ImageService
  ) { }

  ionViewWillEnter() {
    this.siguientes();
  }

  doRefresh(event: any) {
    this.posts = [];
    this.siguientes(event, true);
    this.habilitado = true;
    //this.posts = [];
  }

  async siguientes(event?: any, pull: boolean = false) {
    try {
      // Llama a la nueva versión de getPosts que devuelve una Promise
      const resp = await this.postsService.getPosts(pull);

      resp.forEach( async post => {

        if (!post.imageUrl){
          post.imageUrl = await this.imageService.getPostImageUrl(post.imagePath); // Actualiza la URL caché
        }

        if (!post.owner.imageUrl){
          post.owner.imageUrl = await this.imageService.getProfileImageUrl(post.owner.imagePath); // Actualiza la URL caché
        }

        if (post.comments){
          post.comments.forEach(async comment => {
            if (!comment.owner.imageUrl){
              comment.owner.imageUrl = await this.imageService.getProfileImageUrl(comment.owner.imagePath); // Actualiza la URL caché
            }
          });
        }

      })

      // Agrega los posts recibidos a la lista existente
      this.posts.push(...resp);
      
      // Si hay un evento (scroll o refresco), gestiona la finalización del mismo
      if (event) {
        event.target.complete();
        // Si no se reciben más posts, deshabilita la carga
        if (resp.length === 0) {
          this.habilitado = false;
        }
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Aquí puedes manejar el error como creas conveniente
    }
  }

  goToAddPost() {
    this.navCtrl.navigateForward(['/tabs/create-post']);
  }

  goToAddMatch() {
    // Lógica para navegar a la página de añadir partida
  }

  goToNotifications() {
    this.navCtrl.navigateForward(`/tabs/notifications`);
  }

  // Método para navegar a la página de búsqueda
  goToSearchPage() {
    this.navCtrl.navigateForward(`/tabs/search-users`)
  }

}

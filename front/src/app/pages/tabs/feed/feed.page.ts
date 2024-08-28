import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

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
    private navCtrl: NavController
  ) { }

  ionViewWillEnter() {
    this.siguientes();
  }

  doRefresh(event: any) {
    this.siguientes(event, true);
    this.habilitado = true;
    //this.posts = [];
  }

  siguientes(event?: any, pull: boolean = false) {
    this.postsService.getPosts(pull).subscribe(resp => {
      this.posts.push(...resp);
      if (event) {
        event.target.complete();
        if (resp.length === 0) {
          this.habilitado = false;
        }
      }
    });
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

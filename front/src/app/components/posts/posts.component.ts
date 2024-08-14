import { NgModule, Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Post } from 'src/app/models/post';
import { CommentsModalComponent } from '../comments-modal/comments-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  @Input() posts: Post[] = [];
  selectedPost: Post = {};

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.posts);
  }

  async openComments(post: Post) {
    console.log('Opening comments modal with post:', post);
  
    const modal = await this.modalController.create({
      component: CommentsModalComponent,
      componentProps: { post: post },
      initialBreakpoint: 0.75,
      breakpoints: [0, 0.75, 1],
      backdropDismiss: true,
    });
  
    modal.onDidDismiss().then(() => {
      console.log('Modal dismissed');
      this.selectedPost = {};
    });
  
    return modal.present();
  }
  

  closeCommentsModal() {
    // Aquí deberías manejar el cierre del modal si es necesario.
    // Nota: Este método puede no ser necesario si estás usando ModalController para cerrar el modal.
  }

}

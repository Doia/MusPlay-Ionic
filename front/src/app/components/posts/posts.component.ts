import { NgModule, Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Post, transformarPost } from 'src/app/models/post';
import { CommentsModalComponent } from '../comments-modal/comments-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  @Input() posts: Post[] = [];
  selectedPost: Post = transformarPost({});

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    // Asegúrate de que el post cumple con la interfaz Post antes de utilizarlo
    if (this.selectedPost) {
      this.selectedPost = transformarPost(this.selectedPost);
    }
    console.log(this.posts);
  }

  async openComments(event: { post: Post, openFull: boolean }) {
    const post = event.post;
    const openFull = event.openFull;

    console.log('Opening comments modal with post:', post);

    var initialBreakpoint = 0.75;
    if (openFull){
      initialBreakpoint = 1;
    }
  
    const modal = await this.modalController.create({
      component: CommentsModalComponent,
      componentProps: { post: post },
      initialBreakpoint: initialBreakpoint,
      breakpoints: [0, 0.75, 1],
      backdropDismiss: true,
    });
  
    modal.onDidDismiss().then(() => {
      console.log('Modal dismissed');
      this.selectedPost = transformarPost({});
    });
  
    return modal.present();
  }
  

  closeCommentsModal() {
    // Aquí deberías manejar el cierre del modal si es necesario.
    // Nota: Este método puede no ser necesario si estás usando ModalController para cerrar el modal.
  }

}

import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Post, transformarPost } from 'src/app/models/post';

@Component({
  selector: 'app-comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.scss'],
})
export class CommentsModalComponent {
  
  @Input() post: Post = transformarPost({});
  newComment: string = '';

  constructor(private modalController: ModalController) {
      // Asegúrate de que el post cumple con la interfaz Post antes de utilizarlo
      if (this.post) {
        this.post = transformarPost(this.post);
      }
  }

  // Método opcional si quieres cerrar el modal manualmente
  dismissModal() {
    console.log("se ciuersaaa")
    this.modalController.dismiss();
  }

  sendComment(){
    console.log(this.newComment);
  }
}

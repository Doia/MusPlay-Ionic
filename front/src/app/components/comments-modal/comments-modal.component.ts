import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Post, transformarPost } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.scss'],
})
export class CommentsModalComponent {
  
  @Input() post: Post = transformarPost({});
  newComment: string = '';

  constructor(private modalController: ModalController, private postService: PostsService) {
      // // Asegúrate de que el post cumple con la interfaz Post antes de utilizarlo
      // if (this.post) {
      //   this.post = transformarPost(this.post);
      // }
  }

  // Método opcional si quieres cerrar el modal manualmente
  dismissModal() {
    this.modalController.dismiss();
  }

  async sendComment() {
    if (!this.newComment.trim()) {
      console.warn('El comentario está vacío');
      return;
    }

    try {
      const comment = await this.postService.addComment(this.post.id, this.newComment.trim());

      this.post.comments.push(comment)

      // Ordenar los comentarios por fecha de creación (más recientes primero)
      this.post.comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());


      console.log('Comentario enviado:', comment);
      this.newComment = ''; // Limpiar el campo de comentario
      //this.dismissModal(); // Opcional: cerrar el modal después de enviar el comentario
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
      // Manejo de errores, mostrar un mensaje de error al usuario, etc.
    }
  }
}

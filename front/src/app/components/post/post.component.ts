import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Post, transformarPost } from 'src/app/models/post';
import { AccountService } from 'src/app/services/account.service';
import { PostsService } from 'src/app/services/posts.service';
import { TimeParser } from 'src/app/utils/TimeParser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post = transformarPost({});
  @Output() openCommentsModal = new EventEmitter<{ post: Post, openFull: boolean }>();

  visibleComments: any[] = [];
  maxCommentsPerPost: number = 3; // Número de comentarios que se muestran inicialmente
  hasMoreComments: boolean = false;

  constructor(
    private accountService: AccountService,
    private timeParser: TimeParser,
    private postsService: PostsService,
    private actionSheetController: ActionSheetController // Agregar ActionSheetController
  ) { }

  ngOnInit() {
    if (this.post) {
      this.updateVisibleComments();
    }
  }

  private updateVisibleComments() {
    if (this.post?.comments) {
      this.visibleComments = this.post.comments.slice(0, this.maxCommentsPerPost);
      this.hasMoreComments = this.post.comments.length > this.maxCommentsPerPost;
    }
  }

  parseTime(createdAt: Date | undefined): string {
    return this.timeParser.parseTime(createdAt);
  }

  toggleLike(postId: number, liked: boolean) {
    if (liked) {
      this.postsService.removeLike(postId).subscribe({
        next: (response) => {
          this.post.likes = this.post.likes.filter(user => user.id !== this.accountService.userValue!.id);
          console.log('Like removed successfully', response)
        },
        error: (err) => console.error('Error removing like', err),
      });
    } else {
      this.postsService.addLike(postId).subscribe({
        next: (response) => {
          this.post.likes.push(this.accountService.userValue!);
          console.log('Like added successfully', response)
        },
        error: (err) => console.error('Error adding like', err),
      });
    }
  }

  liked() {
    if (this.accountService.userValue == null) {
      console.log('Error');
    } else {
      return this.post.likes.some(user => user.id === this.accountService.userValue!.id);
    }
    return false;
  }

  openComments(post: Post, openFull: boolean) {
    this.openCommentsModal.emit({post, openFull});
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Compartir',
          icon: 'share-social-outline',
          handler: () => {
            console.log('Compartir clicked');
            // Lógica para compartir el post
          }
        },
        {
          text: 'Eliminar',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            console.log('Eliminar clicked');
            // Lógica para eliminar el post
          }
        }
      ]
    });
    await actionSheet.present();
  }
  
}

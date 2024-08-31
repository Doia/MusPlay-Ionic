import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() openCommentsModal = new EventEmitter<Post>();

  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };

  constructor(
    private accountService: AccountService,
     private timeParser: TimeParser,
     private postsService: PostsService
    ) { }

  ngOnInit() {
    // Asegúrate de que el post cumple con la interfaz Post antes de utilizarlo
    if (this.post) {
      this.post = transformarPost(this.post);
    }
  }

  parseTime(createdAt: Date | undefined): string {
    return this.timeParser.parseTime(createdAt);
  }

  // Método para manejar el evento de like
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


  liked(){

    if (this.accountService.userValue == null){
      console.log('Error');
    }
    else{
      return this.post.likes.some(user => user.id === this.accountService.userValue!.id);
    }
    return false;
  }

  openComments(post: Post) {
    this.openCommentsModal.emit(post);
  }

}

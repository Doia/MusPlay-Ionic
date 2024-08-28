import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post, transformarPost } from 'src/app/models/post';

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

  constructor() { }

  ngOnInit() {
    // Asegúrate de que el post cumple con la interfaz Post antes de utilizarlo
    if (this.post) {
      this.post = transformarPost(this.post);
    }
  }

  openComments(post: Post) {
    this.openCommentsModal.emit(post);
  }

}

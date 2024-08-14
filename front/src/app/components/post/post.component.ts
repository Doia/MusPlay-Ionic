import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post = {};
  @Output() openCommentsModal = new EventEmitter<Post>();

  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };

  constructor() { }

  ngOnInit() {
  }

  openComments(post: Post) {
    this.openCommentsModal.emit(post);
  }

}

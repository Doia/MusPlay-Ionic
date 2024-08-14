import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from './explore-container/explore-container.component';
import { CommentComponent } from './comment/comment.component';
import { CommentsModalComponent } from './comments-modal/comments-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PostsComponent,
    PostComponent,
    CommentComponent,
    CommentsModalComponent,
    ExploreContainerComponent
  ],
  exports: [
    PostsComponent,
    PostComponent,
    CommentComponent,
    CommentsModalComponent,
    CommentsModalComponent,
    ExploreContainerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class ComponentsModule { }

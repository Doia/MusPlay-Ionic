import { Component, Input } from '@angular/core';
import { AppComment, transformarAppComment } from 'src/app/models/comment';
import { TimeParser } from 'src/app/utils/TimeParser';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment: AppComment = transformarAppComment({});

  constructor(private timeParser: TimeParser) {
    if (this.comment) {
      this.comment = transformarAppComment(this.comment);
    }
   }

  parseTime(createdAt: Date | undefined): string {
    return this.timeParser.parseTime(createdAt);
  }
}




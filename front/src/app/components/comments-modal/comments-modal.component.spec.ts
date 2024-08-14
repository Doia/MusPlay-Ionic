import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsModalComponent } from './comments-modal.component';

describe('CommentModalComponent', () => {
  let component: CommentsModalComponent;
  let fixture: ComponentFixture<CommentsModalComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ PostComponent ]
  //   })
  //   .compileComponents();
  // }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

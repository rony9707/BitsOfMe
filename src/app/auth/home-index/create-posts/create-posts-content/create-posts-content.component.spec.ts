import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostsContentComponent } from './create-posts-content.component';

describe('CreatePostsContentComponent', () => {
  let component: CreatePostsContentComponent;
  let fixture: ComponentFixture<CreatePostsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePostsContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePostsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

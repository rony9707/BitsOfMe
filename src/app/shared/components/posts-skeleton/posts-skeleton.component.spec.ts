import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsSkeletonComponent } from './posts-skeleton.component';

describe('PostsSkeletonComponent', () => {
  let component: PostsSkeletonComponent;
  let fixture: ComponentFixture<PostsSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

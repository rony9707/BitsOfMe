import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostsHeaderComponent } from './create-posts-header.component';

describe('CreatePostsHeaderComponent', () => {
  let component: CreatePostsHeaderComponent;
  let fixture: ComponentFixture<CreatePostsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePostsHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePostsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

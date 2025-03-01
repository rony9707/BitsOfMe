import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMorePostsComponent } from './no-more-posts.component';

describe('NoMorePostsComponent', () => {
  let component: NoMorePostsComponent;
  let fixture: ComponentFixture<NoMorePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoMorePostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoMorePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPublicPostsComponent } from './all-public-posts.component';

describe('AllPublicPostsComponent', () => {
  let component: AllPublicPostsComponent;
  let fixture: ComponentFixture<AllPublicPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPublicPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPublicPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

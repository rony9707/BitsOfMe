import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIndexComponent } from './home-index.component';
import { provideRouter } from '@angular/router';

describe('HomeIndexComponent', () => {
  let component: HomeIndexComponent;
  let fixture: ComponentFixture<HomeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeIndexComponent],
      providers: [
        provideRouter([]), 
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

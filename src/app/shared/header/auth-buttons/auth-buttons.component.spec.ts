import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthButtonsComponent } from './auth-buttons.component';
import { provideRouter } from '@angular/router';

describe('AuthButtonsComponent', () => {
  let component: AuthButtonsComponent;
  let fixture: ComponentFixture<AuthButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthButtonsComponent], // Include the standalone component
      providers: [
        provideRouter([]), 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

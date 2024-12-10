import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordShowComponent } from './password-show.component';

describe('PasswordShowComponent', () => {
  let component: PasswordShowComponent;
  let fixture: ComponentFixture<PasswordShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

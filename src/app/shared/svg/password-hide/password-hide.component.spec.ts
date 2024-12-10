import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordHideComponent } from './password-hide.component';

describe('PasswordHideComponent', () => {
  let component: PasswordHideComponent;
  let fixture: ComponentFixture<PasswordHideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordHideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordHideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

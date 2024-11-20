import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSidenavbarComponent } from './header-sidenavbar.component';

describe('HeaderSidenavbarComponent', () => {
  let component: HeaderSidenavbarComponent;
  let fixture: ComponentFixture<HeaderSidenavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSidenavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSidenavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicPhoneComponent } from './music-phone.component';

describe('MusicPhoneComponent', () => {
  let component: MusicPhoneComponent;
  let fixture: ComponentFixture<MusicPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicPhoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

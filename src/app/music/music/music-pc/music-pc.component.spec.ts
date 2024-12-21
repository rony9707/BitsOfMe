import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicPcComponent } from './music-pc.component';

describe('MusicPcComponent', () => {
  let component: MusicPcComponent;
  let fixture: ComponentFixture<MusicPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicPcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongProgressbarComponent } from './song-progressbar.component';

describe('SongProgressbarComponent', () => {
  let component: SongProgressbarComponent;
  let fixture: ComponentFixture<SongProgressbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongProgressbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

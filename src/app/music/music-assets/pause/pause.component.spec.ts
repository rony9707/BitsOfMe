import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseComponent } from './pause.component';

describe('PauseComponent', () => {
  let component: PauseComponent;
  let fixture: ComponentFixture<PauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PauseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

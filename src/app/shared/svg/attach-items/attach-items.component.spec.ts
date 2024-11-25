import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachItemsComponent } from './attach-items.component';

describe('AttachItemsComponent', () => {
  let component: AttachItemsComponent;
  let fixture: ComponentFixture<AttachItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttachItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

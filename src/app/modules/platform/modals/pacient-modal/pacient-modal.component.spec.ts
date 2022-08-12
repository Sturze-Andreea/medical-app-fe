import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientModalComponent } from './pacient-modal.component';

describe('PacientModalComponent', () => {
  let component: PacientModalComponent;
  let fixture: ComponentFixture<PacientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

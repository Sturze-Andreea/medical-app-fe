import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnamnesisModalComponent } from './anamnesis-modal.component';

describe('AnamnesisModalComponent', () => {
  let component: AnamnesisModalComponent;
  let fixture: ComponentFixture<AnamnesisModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnamnesisModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnamnesisModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

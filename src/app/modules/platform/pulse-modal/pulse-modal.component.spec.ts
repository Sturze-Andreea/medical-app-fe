import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PulseModalComponent } from './pulse-modal.component';

describe('PulseModalComponent', () => {
  let component: PulseModalComponent;
  let fixture: ComponentFixture<PulseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PulseModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PulseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

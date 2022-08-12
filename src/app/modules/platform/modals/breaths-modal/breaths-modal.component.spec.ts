import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreathsModalComponent } from './breaths-modal.component';

describe('BreathsModalComponent', () => {
  let component: BreathsModalComponent;
  let fixture: ComponentFixture<BreathsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreathsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreathsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

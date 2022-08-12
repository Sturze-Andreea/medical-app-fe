import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPulsesComponent } from './all-pulses.component';

describe('AllPulsesComponent', () => {
  let component: AllPulsesComponent;
  let fixture: ComponentFixture<AllPulsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPulsesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPulsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

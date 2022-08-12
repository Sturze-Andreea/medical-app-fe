import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBreathsComponent } from './all-breaths.component';

describe('AllBreathsComponent', () => {
  let component: AllBreathsComponent;
  let fixture: ComponentFixture<AllBreathsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBreathsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBreathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

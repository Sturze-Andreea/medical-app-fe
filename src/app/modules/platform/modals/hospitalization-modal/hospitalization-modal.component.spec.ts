import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalizationModalComponent } from './hospitalization-modal.component';

describe('HospitalizationModalComponent', () => {
  let component: HospitalizationModalComponent;
  let fixture: ComponentFixture<HospitalizationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalizationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalizationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

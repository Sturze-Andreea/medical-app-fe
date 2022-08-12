import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalExaminationModalComponent } from './clinical-examination-modal.component';

describe('ClinicalExaminationModalComponent', () => {
  let component: ClinicalExaminationModalComponent;
  let fixture: ComponentFixture<ClinicalExaminationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalExaminationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalExaminationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

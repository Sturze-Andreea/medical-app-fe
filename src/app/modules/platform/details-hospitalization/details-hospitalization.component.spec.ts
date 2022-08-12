import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsHospitalizationComponent } from './details-hospitalization.component';

describe('DetailsHospitalizationComponent', () => {
  let component: DetailsHospitalizationComponent;
  let fixture: ComponentFixture<DetailsHospitalizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsHospitalizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsHospitalizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTasComponent } from './all-tas.component';

describe('AllTasComponent', () => {
  let component: AllTasComponent;
  let fixture: ComponentFixture<AllTasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersModalComponent } from './others-modal.component';

describe('OthersModalComponent', () => {
  let component: OthersModalComponent;
  let fixture: ComponentFixture<OthersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OthersModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

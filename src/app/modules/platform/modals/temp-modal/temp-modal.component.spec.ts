import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempModalComponent } from './temp-modal.component';

describe('TempModalComponent', () => {
  let component: TempModalComponent;
  let fixture: ComponentFixture<TempModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

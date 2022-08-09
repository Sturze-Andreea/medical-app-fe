import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WardModalComponent } from './ward-modal.component';

describe('WardModalComponent', () => {
  let component: WardModalComponent;
  let fixture: ComponentFixture<WardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WardModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

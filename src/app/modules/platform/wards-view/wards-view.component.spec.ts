import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WardsViewComponent } from './wards-view.component';

describe('WardsViewComponent', () => {
  let component: WardsViewComponent;
  let fixture: ComponentFixture<WardsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WardsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WardsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

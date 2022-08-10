import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPacientsViewComponent } from './all-pacients-view.component';

describe('AllPacientsViewComponent', () => {
  let component: AllPacientsViewComponent;
  let fixture: ComponentFixture<AllPacientsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPacientsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPacientsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

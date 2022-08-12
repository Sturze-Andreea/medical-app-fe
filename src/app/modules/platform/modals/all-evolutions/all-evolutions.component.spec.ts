import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEvolutionsComponent } from './all-evolutions.component';

describe('AllEvolutionsComponent', () => {
  let component: AllEvolutionsComponent;
  let fixture: ComponentFixture<AllEvolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllEvolutionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEvolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

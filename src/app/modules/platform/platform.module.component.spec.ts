import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformModuleComponent } from './platform.module.component';

describe('PlatformModuleComponent', () => {
  let component: PlatformModuleComponent;
  let fixture: ComponentFixture<PlatformModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

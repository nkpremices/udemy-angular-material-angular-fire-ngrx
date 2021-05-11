import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasTrainingsComponent } from './pas-trainings.component';

describe('PasTrainingsComponent', () => {
  let component: PasTrainingsComponent;
  let fixture: ComponentFixture<PasTrainingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasTrainingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

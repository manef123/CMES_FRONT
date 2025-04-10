import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCenterFormComponent } from './work-center-form.component';

describe('WorkCenterFormComponent', () => {
  let component: WorkCenterFormComponent;
  let fixture: ComponentFixture<WorkCenterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkCenterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkCenterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

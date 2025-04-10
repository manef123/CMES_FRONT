import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCenterListComponent } from './work-center-list.component';

describe('WorkCenterListComponent', () => {
  let component: WorkCenterListComponent;
  let fixture: ComponentFixture<WorkCenterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkCenterListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkCenterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

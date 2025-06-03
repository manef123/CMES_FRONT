import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicAssignmentComponent } from './characteristic-assignment.component';

describe('CharacteristicAssignmentComponent', () => {
  let component: CharacteristicAssignmentComponent;
  let fixture: ComponentFixture<CharacteristicAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacteristicAssignmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacteristicAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativeBomComponent } from './alternative-bom.component';

describe('AlternativeBomComponent', () => {
  let component: AlternativeBomComponent;
  let fixture: ComponentFixture<AlternativeBomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlternativeBomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlternativeBomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

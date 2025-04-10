import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomFormComponent } from './bom-form.component';

describe('BomFormComponent', () => {
  let component: BomFormComponent;
  let fixture: ComponentFixture<BomFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BomFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

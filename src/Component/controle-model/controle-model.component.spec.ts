import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleModelComponent } from './controle-model.component';

describe('ControleModelComponent', () => {
  let component: ControleModelComponent;
  let fixture: ComponentFixture<ControleModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControleModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControleModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

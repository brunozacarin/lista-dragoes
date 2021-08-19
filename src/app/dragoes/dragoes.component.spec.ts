import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragoesComponent } from './dragoes.component';

describe('DragoesComponent', () => {
  let component: DragoesComponent;
  let fixture: ComponentFixture<DragoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragoesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

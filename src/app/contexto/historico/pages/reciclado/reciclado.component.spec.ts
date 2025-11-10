import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecicladoComponent } from './reciclado.component';

describe('RecicladoComponent', () => {
  let component: RecicladoComponent;
  let fixture: ComponentFixture<RecicladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecicladoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecicladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

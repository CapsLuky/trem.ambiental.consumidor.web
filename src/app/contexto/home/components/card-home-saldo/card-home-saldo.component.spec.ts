import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHomeSaldoComponent } from './card-home-saldo.component';

describe('CardHomeSaldoComponent', () => {
  let component: CardHomeSaldoComponent;
  let fixture: ComponentFixture<CardHomeSaldoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardHomeSaldoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHomeSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

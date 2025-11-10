import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHomeRankingComponent } from './card-home-ranking.component';

describe('CardHomeRankingComponent', () => {
  let component: CardHomeRankingComponent;
  let fixture: ComponentFixture<CardHomeRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardHomeRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHomeRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

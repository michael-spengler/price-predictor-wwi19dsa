import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTradeComponent } from './new-trade.component';

describe('NewTradeComponent', () => {
  let component: NewTradeComponent;
  let fixture: ComponentFixture<NewTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

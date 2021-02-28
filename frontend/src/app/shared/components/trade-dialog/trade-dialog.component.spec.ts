import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeDialogComponent } from './trade-dialog.component';

describe('TradeDialogComponent', () => {
  let component: TradeDialogComponent;
  let fixture: ComponentFixture<TradeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

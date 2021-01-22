import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOverlayComponent } from './payment-overlay.component';

describe('PaymentOverlayComponent', () => {
  let component: PaymentOverlayComponent;
  let fixture: ComponentFixture<PaymentOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});


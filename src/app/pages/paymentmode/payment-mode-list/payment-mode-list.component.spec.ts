import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentModeListComponent } from './payment-mode-list.component';

describe('PaymentModeListComponent', () => {
  let component: PaymentModeListComponent;
  let fixture: ComponentFixture<PaymentModeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentModeListComponent]
    });
    fixture = TestBed.createComponent(PaymentModeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

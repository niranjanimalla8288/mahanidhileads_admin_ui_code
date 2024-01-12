import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderSubscriptionPaymentsListComponent } from './service-provider-subscription-payments-list.component';

describe('ServiceProviderSubscriptionPaymentsListComponent', () => {
  let component: ServiceProviderSubscriptionPaymentsListComponent;
  let fixture: ComponentFixture<ServiceProviderSubscriptionPaymentsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceProviderSubscriptionPaymentsListComponent]
    });
    fixture = TestBed.createComponent(ServiceProviderSubscriptionPaymentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

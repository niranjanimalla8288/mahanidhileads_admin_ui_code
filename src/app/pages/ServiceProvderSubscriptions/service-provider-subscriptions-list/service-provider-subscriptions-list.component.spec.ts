import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderSubscriptionsListComponent } from './service-provider-subscriptions-list.component';

describe('ServiceProviderSubscriptionsListComponent', () => {
  let component: ServiceProviderSubscriptionsListComponent;
  let fixture: ComponentFixture<ServiceProviderSubscriptionsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceProviderSubscriptionsListComponent]
    });
    fixture = TestBed.createComponent(ServiceProviderSubscriptionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

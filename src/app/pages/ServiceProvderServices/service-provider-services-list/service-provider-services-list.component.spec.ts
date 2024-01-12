import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderServicesListComponent } from './service-provider-services-list.component';

describe('ServiceProviderServicesListComponent', () => {
  let component: ServiceProviderServicesListComponent;
  let fixture: ComponentFixture<ServiceProviderServicesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceProviderServicesListComponent]
    });
    fixture = TestBed.createComponent(ServiceProviderServicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

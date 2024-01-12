import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderCategoryServicesListComponent } from './service-provider-category-services-list.component';

describe('ServiceProviderCategoryServicesListComponent', () => {
  let component: ServiceProviderCategoryServicesListComponent;
  let fixture: ComponentFixture<ServiceProviderCategoryServicesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceProviderCategoryServicesListComponent]
    });
    fixture = TestBed.createComponent(ServiceProviderCategoryServicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

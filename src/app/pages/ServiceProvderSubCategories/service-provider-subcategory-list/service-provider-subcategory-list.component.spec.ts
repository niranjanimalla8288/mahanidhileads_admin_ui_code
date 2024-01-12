import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderSubcategoryListComponent } from './service-provider-subcategory-list.component';

describe('ServiceProviderSubcategoryListComponent', () => {
  let component: ServiceProviderSubcategoryListComponent;
  let fixture: ComponentFixture<ServiceProviderSubcategoryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceProviderSubcategoryListComponent]
    });
    fixture = TestBed.createComponent(ServiceProviderSubcategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

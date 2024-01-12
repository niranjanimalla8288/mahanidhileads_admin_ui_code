import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderCategoryListComponent } from './service-provider-category-list.component';

describe('ServiceProviderCategoryListComponent', () => {
  let component: ServiceProviderCategoryListComponent;
  let fixture: ComponentFixture<ServiceProviderCategoryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceProviderCategoryListComponent]
    });
    fixture = TestBed.createComponent(ServiceProviderCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

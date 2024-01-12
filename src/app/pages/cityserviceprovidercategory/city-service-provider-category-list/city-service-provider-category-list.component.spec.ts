import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityServiceProviderCategoryListComponent } from './city-service-provider-category-list.component';

describe('CityServiceProviderCategoryListComponent', () => {
  let component: CityServiceProviderCategoryListComponent;
  let fixture: ComponentFixture<CityServiceProviderCategoryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CityServiceProviderCategoryListComponent]
    });
    fixture = TestBed.createComponent(CityServiceProviderCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

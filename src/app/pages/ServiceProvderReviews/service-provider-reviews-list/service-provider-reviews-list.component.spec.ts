import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderReviewsListComponent } from './service-provider-reviews-list.component';

describe('ServiceProviderReviewsListComponent', () => {
  let component: ServiceProviderReviewsListComponent;
  let fixture: ComponentFixture<ServiceProviderReviewsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceProviderReviewsListComponent]
    });
    fixture = TestBed.createComponent(ServiceProviderReviewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

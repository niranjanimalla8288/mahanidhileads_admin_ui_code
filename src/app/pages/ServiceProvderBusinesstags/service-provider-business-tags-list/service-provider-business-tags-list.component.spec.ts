import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderBusinessTagsListComponent } from './service-provider-business-tags-list.component';

describe('ServiceProviderBusinessTagsListComponent', () => {
  let component: ServiceProviderBusinessTagsListComponent;
  let fixture: ComponentFixture<ServiceProviderBusinessTagsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceProviderBusinessTagsListComponent]
    });
    fixture = TestBed.createComponent(ServiceProviderBusinessTagsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderBadgesComponent } from './service-provider-badges.component';

describe('ServiceProviderBadgesComponent', () => {
  let component: ServiceProviderBadgesComponent;
  let fixture: ComponentFixture<ServiceProviderBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceProviderBadgesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProviderBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

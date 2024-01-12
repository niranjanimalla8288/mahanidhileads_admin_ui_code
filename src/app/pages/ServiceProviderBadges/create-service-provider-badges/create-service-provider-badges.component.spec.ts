import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceProviderBadgesComponent } from './create-service-provider-badges.component';

describe('CreateServiceProviderBadgesComponent', () => {
  let component: CreateServiceProviderBadgesComponent;
  let fixture: ComponentFixture<CreateServiceProviderBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServiceProviderBadgesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceProviderBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

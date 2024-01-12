import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceProvderServicesComponent } from './create-service-provder-services.component';

describe('CreateServiceProvderServicesComponent', () => {
  let component: CreateServiceProvderServicesComponent;
  let fixture: ComponentFixture<CreateServiceProvderServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServiceProvderServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceProvderServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

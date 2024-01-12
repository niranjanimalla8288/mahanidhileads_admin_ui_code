import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceProvderCategoryServicesComponent } from './create-service-provder-category-services.component';

describe('CreateServiceProvderCategoryServicesComponent', () => {
  let component: CreateServiceProvderCategoryServicesComponent;
  let fixture: ComponentFixture<CreateServiceProvderCategoryServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServiceProvderCategoryServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceProvderCategoryServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

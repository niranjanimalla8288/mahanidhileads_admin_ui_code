import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceProvderSubCategoriesComponent } from './create-service-provder-sub-categories.component';

describe('CreateServiceProvderSubCategoriesComponent', () => {
  let component: CreateServiceProvderSubCategoriesComponent;
  let fixture: ComponentFixture<CreateServiceProvderSubCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServiceProvderSubCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceProvderSubCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceProvderCategoriesComponent } from './create-service-provder-categories.component';

describe('CreateServiceProvderCategoriesComponent', () => {
  let component: CreateServiceProvderCategoriesComponent;
  let fixture: ComponentFixture<CreateServiceProvderCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServiceProvderCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceProvderCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

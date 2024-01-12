import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceProvderReviewsComponent } from './create-service-provder-reviews.component';

describe('CreateServiceProvderReviewsComponent', () => {
  let component: CreateServiceProvderReviewsComponent;
  let fixture: ComponentFixture<CreateServiceProvderReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServiceProvderReviewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceProvderReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

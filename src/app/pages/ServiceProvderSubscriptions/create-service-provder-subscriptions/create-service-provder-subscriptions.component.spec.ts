import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceProvderSubscriptionsComponent } from './create-service-provder-subscriptions.component';

describe('CreateServiceProvderSubscriptionsComponent', () => {
  let component: CreateServiceProvderSubscriptionsComponent;
  let fixture: ComponentFixture<CreateServiceProvderSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServiceProvderSubscriptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceProvderSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

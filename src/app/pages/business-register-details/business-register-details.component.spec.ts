import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRegisterDetailsComponent } from './business-register-details.component';

describe('BusinessRegisterDetailsComponent', () => {
  let component: BusinessRegisterDetailsComponent;
  let fixture: ComponentFixture<BusinessRegisterDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessRegisterDetailsComponent]
    });
    fixture = TestBed.createComponent(BusinessRegisterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

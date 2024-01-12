import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeFieldsCreateComponent } from './custome-fields-create.component';

describe('CustomeFieldsCreateComponent', () => {
  let component: CustomeFieldsCreateComponent;
  let fixture: ComponentFixture<CustomeFieldsCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomeFieldsCreateComponent]
    });
    fixture = TestBed.createComponent(CustomeFieldsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

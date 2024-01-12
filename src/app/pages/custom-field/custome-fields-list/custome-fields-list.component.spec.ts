import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeFieldsListComponent } from './custome-fields-list.component';

describe('CustomeFieldsListComponent', () => {
  let component: CustomeFieldsListComponent;
  let fixture: ComponentFixture<CustomeFieldsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomeFieldsListComponent]
    });
    fixture = TestBed.createComponent(CustomeFieldsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

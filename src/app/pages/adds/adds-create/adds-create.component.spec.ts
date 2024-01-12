import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsCreateComponent } from './adds-create.component';

describe('AddsCreateComponent', () => {
  let component: AddsCreateComponent;
  let fixture: ComponentFixture<AddsCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddsCreateComponent]
    });
    fixture = TestBed.createComponent(AddsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

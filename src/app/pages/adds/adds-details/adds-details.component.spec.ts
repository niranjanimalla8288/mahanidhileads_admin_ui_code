import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsDetailsComponent } from './adds-details.component';

describe('AddsDetailsComponent', () => {
  let component: AddsDetailsComponent;
  let fixture: ComponentFixture<AddsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddsDetailsComponent]
    });
    fixture = TestBed.createComponent(AddsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

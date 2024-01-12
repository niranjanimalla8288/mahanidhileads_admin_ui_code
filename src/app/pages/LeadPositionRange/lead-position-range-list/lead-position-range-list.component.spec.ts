import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadPositionRangeListComponent } from './lead-position-range-list.component';

describe('LeadPositionRangeListComponent', () => {
  let component: LeadPositionRangeListComponent;
  let fixture: ComponentFixture<LeadPositionRangeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadPositionRangeListComponent]
    });
    fixture = TestBed.createComponent(LeadPositionRangeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

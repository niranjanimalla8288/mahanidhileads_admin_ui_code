import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadPositionListComponent } from './lead-position-list.component';

describe('LeadPositionListComponent', () => {
  let component: LeadPositionListComponent;
  let fixture: ComponentFixture<LeadPositionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadPositionListComponent]
    });
    fixture = TestBed.createComponent(LeadPositionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

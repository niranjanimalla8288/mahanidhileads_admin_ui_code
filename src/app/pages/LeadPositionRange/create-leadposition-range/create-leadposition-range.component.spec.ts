import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeadpositionRangeComponent } from './create-leadposition-range.component';

describe('CreateLeadpositionRangeComponent', () => {
  let component: CreateLeadpositionRangeComponent;
  let fixture: ComponentFixture<CreateLeadpositionRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLeadpositionRangeComponent]
    });
    fixture = TestBed.createComponent(CreateLeadpositionRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

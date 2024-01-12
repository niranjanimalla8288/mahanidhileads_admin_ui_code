import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeadPositionComponent } from './create-lead-position.component';

describe('CreateLeadPositionComponent', () => {
  let component: CreateLeadPositionComponent;
  let fixture: ComponentFixture<CreateLeadPositionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLeadPositionComponent]
    });
    fixture = TestBed.createComponent(CreateLeadPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

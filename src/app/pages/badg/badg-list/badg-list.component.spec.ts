import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgListComponent } from './badg-list.component';

describe('BadgListComponent', () => {
  let component: BadgListComponent;
  let fixture: ComponentFixture<BadgListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadgListComponent]
    });
    fixture = TestBed.createComponent(BadgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

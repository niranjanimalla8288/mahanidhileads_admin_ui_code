import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgCreateComponent } from './badg-create.component';

describe('BadgCreateComponent', () => {
  let component: BadgCreateComponent;
  let fixture: ComponentFixture<BadgCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

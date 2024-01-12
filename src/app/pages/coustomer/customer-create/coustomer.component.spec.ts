import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoustomerComponent } from './coustomer.component';

describe('CoustomerComponent', () => {
  let component: CoustomerComponent;
  let fixture: ComponentFixture<CoustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

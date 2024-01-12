import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityareaComponent } from './cityarea.component';

describe('CityareaComponent', () => {
  let component: CityareaComponent;
  let fixture: ComponentFixture<CityareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

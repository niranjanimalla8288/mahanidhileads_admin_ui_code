import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityareaListComponent } from './cityarea-list.component';

describe('CityareaListComponent', () => {
  let component: CityareaListComponent;
  let fixture: ComponentFixture<CityareaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CityareaListComponent]
    });
    fixture = TestBed.createComponent(CityareaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

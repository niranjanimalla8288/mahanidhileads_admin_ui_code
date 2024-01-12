import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityserviceprovidercategoryComponent } from './cityserviceprovidercategory.component';

describe('CityserviceprovidercategoryComponent', () => {
  let component: CityserviceprovidercategoryComponent;
  let fixture: ComponentFixture<CityserviceprovidercategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityserviceprovidercategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityserviceprovidercategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

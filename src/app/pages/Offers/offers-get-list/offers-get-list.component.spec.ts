import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersGetListComponent } from './offers-get-list.component';

describe('OffersGetListComponent', () => {
  let component: OffersGetListComponent;
  let fixture: ComponentFixture<OffersGetListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffersGetListComponent]
    });
    fixture = TestBed.createComponent(OffersGetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

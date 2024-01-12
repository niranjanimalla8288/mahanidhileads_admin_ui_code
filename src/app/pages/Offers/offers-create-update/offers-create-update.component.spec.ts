import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersCreateUpdateComponent } from './offers-create-update.component';

describe('OffersCreateUpdateComponent', () => {
  let component: OffersCreateUpdateComponent;
  let fixture: ComponentFixture<OffersCreateUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffersCreateUpdateComponent]
    });
    fixture = TestBed.createComponent(OffersCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AminitiesCreateUpdateComponent } from './aminities-create-update.component';

describe('AminitiesCreateUpdateComponent', () => {
  let component: AminitiesCreateUpdateComponent;
  let fixture: ComponentFixture<AminitiesCreateUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AminitiesCreateUpdateComponent]
    });
    fixture = TestBed.createComponent(AminitiesCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

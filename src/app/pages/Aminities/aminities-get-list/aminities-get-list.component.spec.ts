import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AminitiesGetListComponent } from './aminities-get-list.component';

describe('AminitiesGetListComponent', () => {
  let component: AminitiesGetListComponent;
  let fixture: ComponentFixture<AminitiesGetListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AminitiesGetListComponent]
    });
    fixture = TestBed.createComponent(AminitiesGetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

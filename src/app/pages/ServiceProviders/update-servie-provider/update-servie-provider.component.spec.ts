import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateServieProviderComponent } from './update-servie-provider.component';

describe('UpdateServieProviderComponent', () => {
  let component: UpdateServieProviderComponent;
  let fixture: ComponentFixture<UpdateServieProviderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateServieProviderComponent]
    });
    fixture = TestBed.createComponent(UpdateServieProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

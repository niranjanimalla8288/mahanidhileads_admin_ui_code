import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceProvderBusinesstagsComponent } from './create-service-provder-businesstags.component';

describe('CreateServiceProvderBusinesstagsComponent', () => {
  let component: CreateServiceProvderBusinesstagsComponent;
  let fixture: ComponentFixture<CreateServiceProvderBusinesstagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServiceProvderBusinesstagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceProvderBusinesstagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

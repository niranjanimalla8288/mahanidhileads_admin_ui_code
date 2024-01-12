import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceProvidersComponent } from './create-service-providers.component';

describe('CreateServiceProvidersComponent', () => {
  let component: CreateServiceProvidersComponent;
  let fixture: ComponentFixture<CreateServiceProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServiceProvidersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

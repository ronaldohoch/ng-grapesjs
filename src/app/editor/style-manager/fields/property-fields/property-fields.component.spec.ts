import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyFieldsComponent } from './property-fields.component';

describe('PropertyFieldsComponent', () => {
  let component: PropertyFieldsComponent;
  let fixture: ComponentFixture<PropertyFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyFieldsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

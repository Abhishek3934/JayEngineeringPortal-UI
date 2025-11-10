import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDimensionsComponent } from './add-dimensions.component';

describe('AddDimensionsComponent', () => {
  let component: AddDimensionsComponent;
  let fixture: ComponentFixture<AddDimensionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDimensionsComponent]
    });
    fixture = TestBed.createComponent(AddDimensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

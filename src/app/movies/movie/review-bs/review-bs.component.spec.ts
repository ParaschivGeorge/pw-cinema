import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBsComponent } from './review-bs.component';

describe('ReviewBsComponent', () => {
  let component: ReviewBsComponent;
  let fixture: ComponentFixture<ReviewBsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewBsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewBsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

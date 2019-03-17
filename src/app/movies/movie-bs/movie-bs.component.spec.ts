import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieBsComponent } from './movie-bs.component';

describe('MovieBsComponent', () => {
  let component: MovieBsComponent;
  let fixture: ComponentFixture<MovieBsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieBsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieBsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

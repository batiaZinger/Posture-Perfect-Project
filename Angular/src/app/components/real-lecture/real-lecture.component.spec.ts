import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealLectureComponent } from './real-lecture.component';

describe('RealLectureComponent', () => {
  let component: RealLectureComponent;
  let fixture: ComponentFixture<RealLectureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealLectureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkInterviewComponent } from './work-interview.component';

describe('WorkInterviewComponent', () => {
  let component: WorkInterviewComponent;
  let fixture: ComponentFixture<WorkInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

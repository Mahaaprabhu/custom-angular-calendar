import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMonthCalendarComponent } from './single-month-calendar.component';

describe('SingleMonthCalendarComponent', () => {
  let component: SingleMonthCalendarComponent;
  let fixture: ComponentFixture<SingleMonthCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleMonthCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMonthCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

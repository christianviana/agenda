import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCalendarDayComponent } from './app-calendar-day.component';

describe('AppCalendarDayComponent', () => {
  let component: AppCalendarDayComponent;
  let fixture: ComponentFixture<AppCalendarDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppCalendarDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCalendarDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

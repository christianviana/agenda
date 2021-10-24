import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppReminderComponent } from './app-reminder.component';

describe('AppReminderComponent', () => {
  let component: AppReminderComponent;
  let fixture: ComponentFixture<AppReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppReminderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { configureTestSuite } from 'ng-bullet';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { EventFormComponent } from './event-form.component';
import { MatTimeSelectModule, MatNativeTimeModule } from 'ngx-material-time-select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HomeStubComponent,
  EventServiceStub,
  mockJacksEvent,
  mockImageFile
} from 'src/app/models/testing.model.spec';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ImageSelectComponent } from '../components/image-select/image-select.component';

describe('SubmitFormComponent', () => {
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [EventFormComponent, HomeStubComponent, ImageSelectComponent],
      imports: [
        NoopAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatFormFieldModule,
        MatTimeSelectModule,
        MatNativeTimeModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        RouterTestingModule.withRoutes([{ path: '', component: HomeStubComponent }])
      ],
      providers: [
        {
          provide: EventService,
          useValue: EventServiceStub
        }
      ]
    });
  });

  // component
  let fixture: ComponentFixture<EventFormComponent>;
  let component: EventFormComponent;

  // services
  let eventService: EventService;
  let router: Router;

  // spys
  let navigateSpy: jasmine.Spy;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    eventService = TestBed.get(EventService);
    router = TestBed.get(Router);

    navigateSpy = spyOn(router, 'navigate');
  });

  describe('when app initialized', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize event model to default value', () => {
      expect(component.event).toEqual(component.defaultValue);
    });
  });

  describe('when All Day Event selected', () => {
    let allDayChangeSpy: jasmine.Spy;
    let allDayCheckbox: DebugElement;

    beforeEach(() => {
      component.event.startTime = new Date();
      component.event.endTime = new Date();

      allDayChangeSpy = spyOn(component, 'allDayChange').and.callThrough();
      allDayCheckbox = fixture.debugElement.query(By.css('#allDay'));
      fixture.detectChanges();
    });

    it('should call allDayChange when change event emitted', () => {
      allDayCheckbox.triggerEventHandler('change', { checked: true });
      expect(allDayChangeSpy).toHaveBeenCalledWith(true);
    });

    describe('when checked true', () => {
      beforeEach(() => {
        component.allDayChange(true);
        allDayCheckbox.componentInstance.checked = true;
        fixture.detectChanges();
      });

      it('should reset event startTime and endTime to 12:00AM', () => {
        const actualStartTime = component.event.startTime.getHours();
        const actualEndTime = component.event.endTime.getHours();

        expect(actualStartTime).toBe(0);
        expect(actualEndTime).toBe(0);
      });

      it('should hide startTime and endTime inputs', () => {
        const startTimeInput = fixture.debugElement.query(By.css('input[name=startTime]'));
        const endTimeInput = fixture.debugElement.query(By.css('input[name=endTime]'));

        expect(startTimeInput).toBeFalsy();
        expect(endTimeInput).toBeFalsy();
      });
    });

    describe('when checked false', () => {
      beforeEach(() => {
        component.allDayChange(false);
        allDayCheckbox.componentInstance.checked = false;
        fixture.detectChanges();
      });

      it('should not reset event startTime and endTime', () => {
        expect(component.event.startTime).toBeTruthy();
        expect(component.event.endTime).toBeTruthy();
      });

      it('should show startTime and endTime inputs', () => {
        const startTimeInput = fixture.debugElement.query(By.css('input[name=startTime]'));
        const endTimeInput = fixture.debugElement.query(By.css('input[name=endTime]'));

        expect(startTimeInput).toBeTruthy();
        expect(endTimeInput).toBeTruthy();
      });
    });
  });

  describe('when form submitted', () => {
    let addEventSpy: jasmine.Spy;

    let submitSpy: jasmine.Spy;
    let submitButton: DebugElement;

    let eventForm: DebugElement;

    beforeEach(async(() => {
      addEventSpy = spyOn(eventService, 'addEvent').and.callThrough();
      submitButton = fixture.debugElement.query(By.css('button[type=submit]'));

      eventForm = fixture.debugElement.query(By.css('form'));

      component.event = mockJacksEvent;
      component.selectedImage = mockImageFile;
      component.submit({ valid: true } as any);

      submitSpy = spyOn(component, 'submit').and.callThrough();
    }));

    it('should call submit when ngSubmit event emits', () => {
      eventForm.triggerEventHandler('ngSubmit', null);
      expect(submitSpy).toHaveBeenCalled();
    });

    it('should call submit when submit button clicked', () => {
      submitButton.nativeElement.click();
      expect(submitSpy).toHaveBeenCalled();
    });

    it('should set event timeUpdated', () => {
      expect(component.event.timeUpdated).toBeTruthy();
    });

    it('should call addEvent', () => {
      expect(addEventSpy).toHaveBeenCalledWith(mockJacksEvent, mockImageFile);
    });

    it('it should navigate to home page after event added', () => {
      expect(addEventSpy).toHaveBeenCalledBefore(navigateSpy);
      expect(navigateSpy).toHaveBeenCalledWith(['']);
    });
  });
});

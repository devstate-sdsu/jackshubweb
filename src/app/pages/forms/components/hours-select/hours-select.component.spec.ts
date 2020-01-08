import { configureTestSuite } from 'ng-bullet';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HoursSelectComponent } from './hours-select.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule, MatInputModule, MatFormFieldModule, MatInput, MatCheckbox } from '@angular/material';
import { FormsModule, NgModel } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { mockHours } from 'src/app/models/testing.model.spec';
import { SDate } from 'src/app/models/hours.model';


describe('HoursSelectComponent', () => {
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [HoursSelectComponent],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        MatCheckboxModule,
        MatInputModule,
        MatFormFieldModule
      ]
    });
  });

  let fixture: ComponentFixture<HoursSelectComponent>;
  let component: HoursSelectComponent;
  let inputs: DebugElement[];
  let checkboxes: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.createComponent(HoursSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inputs = fixture.debugElement.queryAll(By.directive(MatInput));
    checkboxes = fixture.debugElement.queryAll(By.directive(MatCheckbox));
  });

  it('should initialize hours model', () => {
    expect(component.hours).toBeTruthy();
  });

  it('disabled should disable all controls', () => {
    component.disabled = true;
    fixture.detectChanges();

    expect(inputs.every(input => input.componentInstance.disabled)).toBe(true);
    expect(checkboxes.every(checkbox => checkbox.componentInstance.disabled)).toBe(true);
  });

  describe('writeValue', () => {
    let onChangeSpy: jasmine.Spy;

    let mockWriteObj: any;
    let start: SDate;
    let end: SDate;

    beforeEach(() => {
      start = mockHours.days[0].hours[0].start;
      end = mockHours.days[0].hours[0].end;
      mockWriteObj = {
        index: 0,
        value: `${start} - ${end}`
      };

      onChangeSpy = spyOn(component, 'onChange');
    });

    it('should change hours', () => {
      const previousHours = Object.create(component.hours);
      component.writeValue(mockWriteObj);

      expect(onChangeSpy).toHaveBeenCalledWith(component.hours);
      expect(component.hours).not.toEqual(previousHours);
    });

    it('should set a day\'s hours to parsed time range', () => {
      component.writeValue(mockWriteObj);
      expect(component.hours.days[0].hours[0]).toEqual({ start, end });
    });
  });

  describe('registerOnChange and registerOnTouched', () => {
    const mockFn = () => {};

    beforeEach(() => {
      component.registerOnChange(mockFn);
      component.registerOnTouched(mockFn);
    });

    it('should set onChange to passed in fn', () => {
      expect(component.onChange).toEqual(mockFn);
    });

    it('should set onChange to passed in fn', () => {
      expect(component.onTouched).toEqual(mockFn);
    });
  });

  describe('setDisabledState', () => {
    beforeEach(() => {
      component.setDisabledState(true);
    });

    it('should set disabled', () => {
      expect(component.disabled).toBe(true);
    });
  });

  describe('valueChange', () => {
    let valueChangeSpy: jasmine.Spy;
    let writeValueSpy: jasmine.Spy;
    let setErrorsSpy: jasmine.Spy;

    const mockModel: NgModel = {
      control: { setErrors: () => {} } as any
    } as any;

    beforeEach(() => {
      writeValueSpy = spyOn(component, 'writeValue').and.callThrough();
      setErrorsSpy = spyOn(mockModel.control, 'setErrors');

      component.valueChange('9:00AM - 5:00PM', 0, mockModel);

      valueChangeSpy = spyOn(component, 'valueChange').and.callThrough();
    });

    it('should be called on ngModelChange event', () => {
      inputs[0].triggerEventHandler('ngModelChange', '9:00AM - 5:00PM');
      fixture.detectChanges();
      expect(valueChangeSpy).toHaveBeenCalledWith('9:00AM - 5:00PM', 0, inputs[0].injector.get(NgModel));
    });

    it('should call writeValue with value and index', () => {
      expect(writeValueSpy).toHaveBeenCalledWith({ value: '9:00AM - 5:00PM', index: 0 });
    });

    it('should set NgModel errors if writeValue throws error', () => {
      component.valueChange('9:00AM', 0, mockModel);
      expect(writeValueSpy).toThrowError();
      expect(setErrorsSpy).toHaveBeenCalledWith({ incorrect: true });
    });
  });
});

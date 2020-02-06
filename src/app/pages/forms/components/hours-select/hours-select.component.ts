import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { WeekDay } from '@angular/common';
import { extractEnumKeys, parseTimeRange, getDates } from 'src/app/util/helpers';
import { Hours, HoursSet } from 'src/app/models/hours.model';
import { SatDatepickerRangeValue } from 'saturn-datepicker';

@Component({
  selector: 'app-hours-select',
  styleUrls: ['../../form-styles.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: HoursSelectComponent, multi: true }
  ],
  template: `
    <h2>Hours</h2>
    <p>Enter with the following format: HH:MMPM/AM - HH:MMPM/AM. For example '4:00PM - 8:00PM'.</p>
    <p>To add multiple ranges, separate by commas. For example '8:00AM - 12:00PM, 4:00PM - 8:00PM'.</p>
    <p>This is temporary!!!</p>
    <div *ngFor="let daySet of hours; let i = index; trackBy: trackByFn">
      <h3 *ngIf="!i; else inputName">{{ daySet.name }} Hours</h3>
      <ng-template #inputName class="flex-row">
        <mat-form-field appearance="fill">
          <input matInput placeholder="Holiday Name">
        </mat-form-field>
        <button mat-icon-button (click)="removeHoliday(i)"><mat-icon>delete</mat-icon></button>
      </ng-template>
      <div *ngFor="let day of daySet.days; let j = index" class="flex-row">
        <mat-checkbox
          #check
          ngModel
          (ngModelChange)="enableChange($event, i, j, timeControl)"
          [disabled]="disabled"
        >{{day.day}}</mat-checkbox>
        <mat-form-field appearance="outline">
          <mat-label *ngIf="check.checked">Enter Time Range</mat-label>
          <input
            required
            #timeControl="ngModel"
            ngModel
            (ngModelChange)="valueChange($event, i, j, timeControl)"
            [disabled]="disabled || !check.checked"
            matInput
            [name]="day.day"
            [placeholder]="(check.checked ? '' : 'Closed')"/>
        </mat-form-field>
      </div>
    </div>
    <span class="flex-row">
      <button mat-stroked-button (click)="picker.open()">Add Holiday Hours</button>
      <mat-form-field style="visibility: hidden">
        <input
          ngModel
          #pickerModel="ngModel"
          matInput
          [satDatepicker]="picker">
        <sat-datepicker #picker (closed)="onHolidayDateClose(pickerModel)" [rangeMode]="true"></sat-datepicker>
        <sat-datepicker-toggle matPrefix></sat-datepicker-toggle>
      </mat-form-field>
    </span>
  `
})
export class HoursSelectComponent implements OnInit, ControlValueAccessor {
  hours: Hours[];

  @Input() disabled = false;

  onChange = (hours: Hours[]) => { };
  onTouched = () => { };

  constructor() { }

  ngOnInit() {
    this.hours = [{
      name: 'Regular',
      days: extractEnumKeys(WeekDay).map(day => {
        return {
          day,
          hours: []
        };
      })
    }];
  }

  onHolidayDateClose(pickerModel: NgModel) {
    const value: SatDatepickerRangeValue<Date> = pickerModel.value;
    if (pickerModel.value) {
      this.hours.push({
        name: 'holiday',
        days: getDates(value.begin, value.end).map(date => {
          return {
            day: date.toDateString(),
            hours: []
          };
        })
      });
      pickerModel.control.reset();
    }
  }

  removeHoliday(index: number) {
    this.hours.splice(index, 1);
  }

  trackByFn(index: number, item: Hours) {
    return index;
  }

  writeValue(writeObj: any): void {
    // ensure fully defined
    if (writeObj && writeObj.dayIndex !== null && writeObj.hourIndex !== null) {
      if (writeObj.value)
        this.hours[writeObj.hourIndex].days[writeObj.dayIndex].hours = parseTimeRange(writeObj.value);
      if (writeObj.disable)
        this.hours[writeObj.hourIndex].days[writeObj.dayIndex].hours = [];
    }
    this.onChange(this.hours);
  }

  registerOnChange(fn: (hours: Hours[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  enableChange(enabled: boolean, hourIndex: number, dayIndex: number, timeControl: NgModel) {
    if (!enabled) timeControl.reset();
    this.writeValue({ disable: !enabled, hourIndex, dayIndex });
  }

  valueChange(value: string, hourIndex: number, dayIndex: number, ngControl: NgModel) {
    try {
      this.writeValue({ value, hourIndex, dayIndex });
    } catch {
      ngControl.control.setErrors({ incorrect: true });
    }
  }
}

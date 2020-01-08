import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { WeekDay } from '@angular/common';
import { extractEnumKeys, parseTimeRange } from 'src/app/util/helpers';
import { Hours, HoursSet } from 'src/app/models/hours.model';

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
    <div *ngFor="let day of hours.days; let i =index" class="flex-row">
      <mat-checkbox #check [disabled]="disabled">{{day.day}}</mat-checkbox>
      <mat-form-field appearance="outline">
        <mat-label *ngIf="check.checked">Enter Time Range</mat-label>
        <input
          required
          #timeControl="ngModel"
          ngModel
          (ngModelChange)="valueChange($event, i, timeControl)"
          [disabled]="disabled || !check.checked"
          matInput
          [name]="day.day"
          [placeholder]="(check.checked ? '' : 'Closed')"/>
      </mat-form-field>
    </div>
  `
})
export class HoursSelectComponent implements OnInit, ControlValueAccessor {
  hours: Hours;

  @Input() disabled = false;

  onChange = (hours: Hours) => { };
  onTouched = () => { };

  constructor() { }

  ngOnInit() {
    this.hours = {
      name: 'regularHours',
      days: extractEnumKeys(WeekDay).map(day => {
        return {
          day,
          hours: []
        };
      })
    };
  }


  writeValue(writeObj: any): void {
    // ensure fully defined
    if (writeObj && writeObj.index !== null && writeObj.value)
      this.hours.days[writeObj.index].hours = parseTimeRange(writeObj.value);
    this.onChange(this.hours);
  }

  registerOnChange(fn: (hours: Hours) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  valueChange(value: string, index: number, ngControl: NgModel) {
    try {
      this.writeValue({ value, index });
    } catch {
      ngControl.control.setErrors({ incorrect: true });
    }
  }
}

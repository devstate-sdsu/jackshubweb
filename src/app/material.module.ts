import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material';
import { MatNativeTimeModule, MatTimeSelectModule } from 'ngx-material-time-select';
import { SatNativeDateModule, SatDatepickerModule } from 'saturn-datepicker';

@NgModule({
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatTimeSelectModule,
    MatNativeTimeModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatTimeSelectModule,
    MatNativeTimeModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
})
export class MaterialModule {}

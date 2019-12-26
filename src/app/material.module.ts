import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

@NgModule({
  imports: [MatInputModule, MatButtonModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule],
  exports: [MatInputModule, MatButtonModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule]
})
export class MaterialModule {}

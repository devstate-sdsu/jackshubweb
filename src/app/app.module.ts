import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FirebaseModule } from './firebase.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SubmitFormComponent } from './pages/submit-form/submit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SubmitFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FirebaseModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

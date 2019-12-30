import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FirebaseModule } from './firebase.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EventFormComponent } from './pages/forms/event-form/event-form.component';
import { HomeComponent } from './pages/home/home.component';
import { ServicesFormComponent } from './pages/forms/services-form/services-form.component';

// bring in essential modules here
@NgModule({
  declarations: [
    AppComponent,
    EventFormComponent,
    ServicesFormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FirebaseModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { ImageSelectComponent } from './pages/forms/components/image-select/image-select.component';
import { HoursSelectComponent } from './pages/forms/components/hours-select/hours-select.component';
import { MatRadioModule, MatSelectModule, MatOptionModule } from '@angular/material';
import { EditServiceComponent } from './pages/edit/edit-service/edit-service.component';
import { EditFoodComponent } from './pages/edit/edit-food/edit-food.component';

// bring in essential modules here
@NgModule({
  declarations: [
    AppComponent,
    EventFormComponent,
    ServicesFormComponent,
    HomeComponent,
    ImageSelectComponent,
    HoursSelectComponent,
    EditServiceComponent,
    EditFoodComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FirebaseModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

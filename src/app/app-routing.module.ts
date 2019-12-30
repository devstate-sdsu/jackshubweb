import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventFormComponent } from './pages/forms/event-form/event-form.component';
import { ServicesFormComponent } from './pages/forms/services-form/services-form.component';

// define routes here
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'submit-event', component: EventFormComponent },
  { path: 'submit-services', component: ServicesFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventFormComponent } from './pages/forms/event-form/event-form.component';

// define routes here
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'submit-event', component: EventFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

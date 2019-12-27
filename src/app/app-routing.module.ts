import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SubmitFormComponent } from './pages/submit-form/submit-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'submit-event', component: SubmitFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

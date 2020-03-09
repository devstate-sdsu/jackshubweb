import {Component, OnDestroy, OnInit} from '@angular/core';
import { Service } from 'src/app/models/services.model';
import { ServicesService } from 'src/app/services/services.service';
import { FoodService } from 'src/app/services/food.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Hours } from 'src/app/models/hours.model';


// lot of similar code to events form, I think some of this can be abstracted into one form class
@Component({
  selector: 'app-services-form',
  templateUrl: './services-form.component.html',
  styleUrls: ['../form-styles.css', './services-form.component.css']
})
export class ServicesFormComponent implements OnInit, OnDestroy {
  service: Service;
  selectedImage: File;
  selectedService = 'services';
  editingMode = false;
  useExistingImage = false;

  constructor(
    private servicesService: ServicesService,
    private foodService: FoodService,
    private router: Router
    ) { }

  ngOnInit() {
    if (this.servicesService.serviceToEdit !== null) {
      this.service = this.servicesService.serviceToEdit;
      this.editingMode = true;
      this.useExistingImage = true;
    } else {
      this.service = this.servicesService.defaultService;
    }
  }

  ngOnDestroy() {
    this.servicesService.serviceToEdit = null;
    this.editingMode = false;
    this.useExistingImage = false;
  }

  hoursSelected(hours: Hours[]) {
    if (hours[0]) {
      this.service.hours.regularHours = hours[0];
      this.service.hours.holidayHours = hours.slice(1);
      console.log(this.service.hours);
    }
  }

  toggleImage(checked) {
    this.useExistingImage = checked;
  }

  submit(serviceForm: NgForm) {
    if (serviceForm.valid) {
      // upload service to firebase
      if (this.selectedService == "food") {
        this.foodService.addFood(this.service, this.selectedImage)
          .then(() => this.router.navigate(['']));
      } else {
        this.servicesService.addService(this.service, this.selectedImage)
          .then(() => this.router.navigate(['']));
      }
    }
  }
}

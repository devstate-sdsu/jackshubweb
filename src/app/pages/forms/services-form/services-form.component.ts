import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/services.model';
import { ServicesService } from 'src/app/services/services.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


// lot of similar code to events form, I think some of this can be abstracted into one form class
@Component({
  selector: 'app-services-form',
  templateUrl: './services-form.component.html',
  styleUrls: ['../form-styles.css', './services-form.component.css']
})
export class ServicesFormComponent implements OnInit {
  service: Service;
  selectedImage: File;

  defaultValue: Service = {
    name: '',
    summary: '',
    image: '',
    bigLocation: '',
    tinyLocation: '',
    email: '',
    hours: {
      name: '',
      days: []
    },
    mainInfo: '',
    phoneNumber: ''
  };

  constructor(private servicesService: ServicesService, private router: Router) { }

  ngOnInit() {
    this.service = this.defaultValue;
  }

  submit(serviceForm: NgForm) {
    if (serviceForm.valid) {
      // upload service to firebase
      this.servicesService.addService(this.service, this.selectedImage)
        .then(() => this.router.navigate(['']));
    }
  }
}

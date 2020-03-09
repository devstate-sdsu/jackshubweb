import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/services.model';
import {ServicesService} from '../../../services/services.service';
import {Router} from '@angular/router';
import {ServicesFormComponent} from '../../forms/services-form/services-form.component';
import {SERVICES} from '../../../util/globals';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {
  service: Service;
  services: Array<Service>;
  constructor(
    private servicesService: ServicesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.service = this.servicesService.defaultService;
    this.servicesService.getServicesForEditing().then((res) => {
      this.services = res;
      console.log(this.services);
    });
  }

  onServiceToEditChange(serviceToEdit) {
    this.servicesService.serviceToEdit = serviceToEdit;
    this.servicesService.typeOfServiceToEdit = SERVICES;
  }
}

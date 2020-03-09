import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/services.model';
import {ServicesService} from '../../../services/services.service';
import {Router} from '@angular/router';
import {FOOD} from '../../../util/globals';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.css']
})
export class EditFoodComponent implements OnInit {
  foodService: Service;
  foodServices: Array<Service>;
  constructor(
    private servicesService: ServicesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.foodService = this.servicesService.defaultService;
    this.servicesService.getFoodForEditing().then((res) => {
      this.foodServices = res;
    });
  }

  onServiceToEditChange(serviceToEdit) {
    this.servicesService.serviceToEdit = serviceToEdit;
    this.servicesService.typeOfServiceToEdit = FOOD;
  }
}

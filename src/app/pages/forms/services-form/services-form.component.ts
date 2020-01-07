import { Component, OnInit } from '@angular/core';
import { Service, ServiceCard } from 'src/app/models/services.model';

@Component({
  selector: 'app-services-form',
  templateUrl: './services-form.component.html',
  styleUrls: ['../form-styles.css', './services-form.component.css']
})
export class ServicesFormComponent implements OnInit {
  service: Service;
  cards: ServiceCard[] = [];
  selectedImage: File;

  defaultValue: Service = {
    name: '',
    summary: '',
    status: '',
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

  constructor() { }

  ngOnInit() {
    this.service = this.defaultValue;
  }

  submit() {
    console.log(this.service);
  }
}

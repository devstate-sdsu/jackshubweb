import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/services.model';

@Component({
  selector: 'app-services-form',
  templateUrl: './services-form.component.html',
  styleUrls: ['../form-styles.css', './services-form.component.css']
})
export class ServicesFormComponent implements OnInit {
  service: Service;

  defaultValue: Service = {
    name: '',
    summary: '',
    status: '',
    image: ''
  };

  constructor() { }

  ngOnInit() {
    this.service = this.defaultValue;
  }

}

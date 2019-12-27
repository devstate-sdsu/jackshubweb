import { Component, OnInit } from '@angular/core';
import { JacksEvent } from 'src/app/models/event.model';
import { EventService } from '../../services/event.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.css']
})
export class SubmitFormComponent implements OnInit {
  event: JacksEvent;
  selectedImage: File;

  startDate = new Date();

  constructor(private eventService: EventService) {}

  ngOnInit() {
    // set default values here
    this.event = {
      name: '',
      description: '',
      summary: '',
      bigLocation: '',
      tinyLocation: '',
      image: '',
      startTime: null,
      endTime: null,
      timeUpdated: null,
      updates: 'submitted from webapp'
    };
  }

  imageChange(event: any) {
    const selectedFiles: File[] = event.target.files;

    if (selectedFiles.length) {
      this.selectedImage = selectedFiles[0];
    }
  }

  allDayChange(checked: boolean) {
    if (checked) {
      this.event.startTime = null;
      this.event.endTime = null;
    }
  }

  submit(eventForm: NgForm) {
    if (eventForm.valid) {
      this.event.timeUpdated = new Date();
      this.eventService.addEvent(this.event, this.selectedImage);
    }
  }
}

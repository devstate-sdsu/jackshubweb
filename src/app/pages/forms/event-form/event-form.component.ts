import { Component, OnInit } from '@angular/core';
import { JacksEvent } from 'src/app/models/event.model';
import { EventService } from '../../../services/event.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  // data to be sent to firebase
  event: JacksEvent;
  selectedImage: File;

  // used by the mat calendar
  startDate = new Date();

  defaultValue = {
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

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit() {
    this.event = this.defaultValue;
  }

  imageChange(event: any) {
    const selectedFiles: File[] = event.target.files;

    if (selectedFiles.length) {
      this.selectedImage = selectedFiles[0];
    }
  }

  allDayChange(isAllDay: boolean) {
    if (isAllDay) {
      // reset the dates to 12:00 AM
      if (this.event.startTime)
        this.event.startTime.setHours(0, 0, 0, 0);
      if (this.event.endTime)
        this.event.endTime.setHours(0, 0, 0, 0);
    }
  }

  submit(eventForm: NgForm) {
    if (eventForm.valid) {
      this.event.timeUpdated = new Date();

      // upload event to firebase
      this.eventService.addEvent(this.event, this.selectedImage)
        .then(() => this.router.navigate(['']));
    }
  }
}

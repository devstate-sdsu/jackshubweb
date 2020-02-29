import { Component, OnInit } from '@angular/core';
import { JacksEvent } from 'src/app/models/event.model';
import { EventService } from '../../../services/event.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['../form-styles.css', './event-form.component.css']
})
export class EventFormComponent implements OnInit {
  // data to be sent to firebase
  event: JacksEvent;
  selectedImage: File;

  // used by the mat calendar
  startDate = new Date();

  setOfTags = new Set();

  defaultValue = {
    name: '',
    description: '',
    summary: '',
    bigLocation: '',
    tinyLocation: '',
    image: null, // will be set later
    startTime: null,
    endTime: null,
    timeUpdated: null,
    updates: 'submitted from webapp',
    tags: []
  };

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit() {
    this.event = this.defaultValue;
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

  toggleTag(tagName: String, isChecked: boolean) {
    if (isChecked) {
      this.setOfTags.add(tagName);
    } else {
      this.setOfTags.delete(tagName);
    }
  }

  submit(eventForm: NgForm) {
    if (eventForm.valid) {
      this.event.timeUpdated = new Date();
      this.event.tags = <Array<String>>[...this.setOfTags];

      // upload event to firebase
      this.eventService.addEvent(this.event, this.selectedImage)
        .then(() => this.router.navigate(['']));
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { JacksEvent } from 'src/app/models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.css']
})
export class SubmitFormComponent implements OnInit {
  event: JacksEvent;
  selectedImage: File;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    // set default values here
    this.event = {
      name: null,
      description: null,
      summary: null,
      bigLocation: null,
      tinyLocation: null,
      image: null,
      startTime: null,
      endTime: null,
      timeUpdated: null,
      updates: 'submitted from webapp'
    };
  }

  imageChange(event: any, textEl: HTMLParagraphElement) {
    const selectedFiles: File[] = event.target.files;

    if (selectedFiles.length) {
      this.selectedImage = selectedFiles[0];
      textEl.innerHTML = selectedFiles[0].name;
    }
  }

  submit() {
    this.event.timeUpdated = new Date();
    this.eventService.addEvent(this.event, this.selectedImage);
  }
}

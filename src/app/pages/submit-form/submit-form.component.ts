import { Component, OnInit } from '@angular/core';
import { JacksEvent } from 'src/app/models/event.model';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.css']
})
export class SubmitFormComponent implements OnInit {
  event: JacksEvent;

  constructor() {}

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
      textEl.innerHTML = selectedFiles[0].name;
    }
  }

  add() {
    console.log(this.event);
  }
}

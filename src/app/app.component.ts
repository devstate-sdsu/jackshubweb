import { Component, OnInit } from '@angular/core';
import { EventService } from './services/event.service';
import { Observable } from 'rxjs';
import { JacksEvent } from './models/event.model';
import { mapToCamelCase } from './util/helpers';
import { tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  events$: Observable<JacksEvent[]>;

  constructor(private hubService: EventService) {}

  ngOnInit() {
    this.events$ = this.hubService.getEvents().pipe(tap(d => console.log(mapToCamelCase(d[0]))));
  }

  add() {
    this.hubService.addEvent({
      bigLocation: 'BIGGGG',
      description: 'an event',
      startTime: new Date(),
      endTime: new Date(),
      image: 'meme.jpg',
      name: 'big event',
      summary: 'a big summary',
      timeUpdated: new Date(),
      tinyLocation: 'tiny but biggg',
      updates: 'mock data'
    });
  }
}

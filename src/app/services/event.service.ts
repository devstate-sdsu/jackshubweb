import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { JacksEvent } from '../models/event.model';
import { map } from 'rxjs/operators';
import { mapToSnakeCase, mapToCamelCase } from '../util/helpers';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root'})
export class EventService {

  constructor(private db: AngularFirestore) {}

  getEvents() {
    const qSnapshot = this.getEventCollection();
    return qSnapshot.valueChanges()
      .pipe(map(events => events.map(event => mapToCamelCase<JacksEvent>(event))));
  }

  addEvent(eventData: JacksEvent) {
    const qSnapshot = this.getEventCollection();
    qSnapshot.add(mapToSnakeCase<any>(eventData));
  }

  private getEventCollection() {
     return this.db.collection<JacksEvent>(environment.eventsCollection);
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { JacksEvent } from '../models/event.model';
import { map } from 'rxjs/operators';
import { mapToSnakeCase, mapToCamelCase } from '../util/helpers';
import { environment } from '../../environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({ providedIn: 'root'})
export class EventService {

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {}

  getEvents() {
    const qSnapshot = this.getEventCollection();
    return qSnapshot.valueChanges()
      .pipe(map(events => events.map(event => mapToCamelCase<JacksEvent>(event))));
  }

  async addEvent(eventData: JacksEvent, imgFile?: File) {
    console.log(eventData);
    if (imgFile) {
      // upload image
      const snapshot = await this.storage.upload(`${environment.eventThumbnailsPath}/${imgFile.name}`, imgFile);

      // update image path
      eventData.image = await snapshot.ref.getDownloadURL();

      console.log(`upload finished: ${eventData.image}`);
    }

    const qSnapshot = this.getEventCollection();
    qSnapshot.add(mapToSnakeCase<any>(eventData));
  }

  private getEventCollection() {
     return this.db.collection<JacksEvent>(environment.eventsCollection);
  }
}

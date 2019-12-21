import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root'})
export class EventService {
  constructor(private db: AngularFirestore) {}

  getEvents() {}

  postEvent(data) {}
}

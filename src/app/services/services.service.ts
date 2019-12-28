import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { JacksEvent } from '../models/event.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Service } from '../models/services.model';

@Injectable({ providedIn: 'root' })
export class ServicesService {
  constructor(private db: AngularFirestore) {}

  getServices() {
    const qSnapshot = this.getServicesCollection();
    const docs$ = qSnapshot.get().pipe(map(snapshot => snapshot.docs));

    // currently isn't real time which will have to be fixed later
    return docs$.pipe(map(docs => docs.map(doc => {
      return {
        ...doc.data(),
        docId: doc.id
      } as Service;
    })));
  }

  getServiceCards(docId: string) {
    const cardsCol = this.db.doc(docId).collection('cards');
    return cardsCol.valueChanges().pipe(map(data => data as any[]));
  }

  private getServicesCollection() {
    return this.db.collection<Service[]>(environment.servicesCollection);
  }
}

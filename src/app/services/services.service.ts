import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Service } from '../models/services.model';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class ServicesService {
  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {}

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

  async addService(serviceData: Service, imgFile?: File) {
    if (imgFile) {
      // upload image
      const snapshot = await this.storage.upload(`${environment.servicesThumbnailsPath}/${imgFile.name}`, imgFile);

      // update image path
      serviceData.image = await snapshot.ref.getDownloadURL();
    }

    const qSnapshot = this.getServicesCollection();
    qSnapshot.add(serviceData);
  }

  private getServicesCollection() {
    return this.db.collection<Service>(environment.servicesCollection);
  }
}

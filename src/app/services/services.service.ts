import {Injectable, Input} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Service } from '../models/services.model';
import { AngularFireStorage } from '@angular/fire/storage';
import {FOOD, SERVICES} from '../util/globals';

@Injectable({ providedIn: 'root' })
export class ServicesService {
  defaultService: Service = {
    name: '',
    summary: '',
    image: '',
    bigLocation: '',
    tinyLocation: '',
    email: '',
    hours: {
      regularHours: null,
      holidayHours: []
    },
    mainInfo: '',
    phoneNumber: ''
  };
  serviceToEdit: Service;
  typeOfServiceToEdit = SERVICES;

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

  async getServicesForEditing() {
    const servicesCollection = this.getServicesCollection();
    const services = [];
    await servicesCollection.ref.get().then((snapshot) => {
      snapshot.forEach(doc => services.push({
        ...doc.data(),
        docId: doc.id
      } as Service));
    });
    return services;
  }

  async addService(serviceData: Service, imgFile?: File, typeOfService?: string) {
    if (imgFile) {
      // upload image
      const snapshot = await this.storage.upload(`${environment.servicesThumbnailsPath}/${imgFile.name}`, imgFile);

      // update image path
      serviceData.image = await snapshot.ref.getDownloadURL();
    }
    const qSnapshot = typeOfService != null && typeOfService === FOOD ? this.getFoodCollection() : this.getServicesCollection();
    if ('docId' in serviceData) {
      const docId = serviceData.docId;
      delete serviceData.docId;
      await qSnapshot.ref.doc(docId).set(serviceData);
    } else {
      await qSnapshot.add(serviceData);
    }
  }

  private getServicesCollection() {
    return this.db.collection<Service>(environment.servicesCollection);
  }

  getFood() {
    const qSnapshot = this.getFoodCollection();
    const docs$ = qSnapshot.get().pipe(map(snapshot => snapshot.docs));

    // currently isn't real time which will have to be fixed later
    return docs$.pipe(map(docs => docs.map(doc => {
      return {
        ...doc.data(),
        docId: doc.id
      } as Service;
    })));
  }

  async getFoodForEditing() {
    const foodCollection = this.getFoodCollection();
    const food = [];
    await foodCollection.ref.get().then((snapshot) => {
      snapshot.forEach(doc => food.push({
        ...doc.data(),
        docId: doc.id
      } as Service));
    });
    return food;
  }

  private getFoodCollection() {
    return this.db.collection<Service>(environment.foodCollection);
  }
}

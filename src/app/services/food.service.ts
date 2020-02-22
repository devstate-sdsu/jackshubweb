import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Service } from '../models/services.model';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class FoodService {
  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {}

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

  async addFood(foodData: Service, imgFile?: File) {
    if (imgFile) {
      // upload image
      const snapshot = await this.storage.upload(`${environment.servicesThumbnailsPath}/${imgFile.name}`, imgFile);

      // update image path
      foodData.image = await snapshot.ref.getDownloadURL();
    }

    const qSnapshot = this.getFoodCollection();
    qSnapshot.add(foodData);
  }

  private getFoodCollection() {
    return this.db.collection<Service>(environment.foodCollection);
  }
}

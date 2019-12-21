import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

const config = {
  apiKey: 'AIzaSyBbudYtHU4SjDlscwpjMMIDy3xw1sUh6PU',
  authDomain: 'rabbitbums.firebaseapp.com',
  databaseURL: 'https://rabbitbums.firebaseio.com',
  projectId: 'rabbitbums',
  storageBucket: 'rabbitbums.appspot.com',
  messagingSenderId: '1032554019582',
  appId: '1:1032554019582:web:8aeee9539a8bddd21283af'
};

@NgModule({
  imports: [
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    // bring these in later if needed
    // AngularFireAuthModule, // auth
    // AngularFireStorageModule // storage
  ],
  declarations: [],
  bootstrap: []
})
export class FirebaseModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { PersonalInfoComponent } from './personal-info/personal-info.component';

var firebaseConfig = {
  apiKey: "AIzaSyBM5QSzk8_ePeLPy0Biq6vXwySVGyYJ1VA",
  authDomain: "studentdatabase-e40b3.firebaseapp.com",
  databaseURL: "https://studentdatabase-e40b3.firebaseio.com",
  projectId: "studentdatabase-e40b3",
  storageBucket: "studentdatabase-e40b3.appspot.com",
  messagingSenderId: "558067736957",
  appId: "1:558067736957:web:136f9dd15fe8c88f"
};

@NgModule({
  declarations: [
    AppComponent,
    PersonalInfoComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

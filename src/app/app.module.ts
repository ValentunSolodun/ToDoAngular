import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ManipulateDataService } from './../app/servise/manipulate-data.service';
import { environment } from './../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { TestComponent } from './test/test.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { FormAddComponent } from './tasks/form-add/form-add.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TestComponent,
    PreloaderComponent,
    FormAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [ManipulateDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

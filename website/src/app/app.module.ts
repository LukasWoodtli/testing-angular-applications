import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import './rxjs-extensions';

import { AppMaterialModule } from './app.material.module';
import { ContactDetailComponent } from './contacts/contact-detail';
import { ContactEditComponent } from './contacts/contact-edit';
import { ContactListComponent } from './contacts/contact-list';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactFeedDialogComponent } from './contacts/contact-feed';
import { ContactFeedService } from './contacts/shared/services';
import { ContactService } from './contacts/shared/services';
import { FavoriteIconDirective } from './contacts/shared/favorite-icon';
import { PageNotFoundComponent } from './page-not-found-component';
import { PhoneNumberPipe } from './contacts/shared/phone-number';
import { NewContactComponent } from './contacts/new-contact/new-contact.component';
import { ShowContactsDirective } from './contacts/shared/show-contacts';

import { AppComponent } from './app.component';
import { RoutingModule } from './app-routing.module';
import { InvalidEmailModalComponent } from './contacts/shared';
import { InvalidPhoneNumberModalComponent } from './contacts/shared';
import { PreferencesService} from "./contacts/shared/services/preferences.service";
import {BrowserStorage} from "./contacts/shared/services/BrowserStorage";
import {PreferencesAsyncService} from "./contacts/shared/services/preferences-async.service";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    ContactEditComponent,
    ContactDetailComponent,
    ContactFeedDialogComponent,
    ContactListComponent,
    ContactsComponent,
    FavoriteIconDirective,
    InvalidEmailModalComponent,
    InvalidPhoneNumberModalComponent,
    PageNotFoundComponent,
    PhoneNumberPipe,
    NewContactComponent,
    ShowContactsDirective
  ],
  entryComponents: [
    ContactFeedDialogComponent,
    InvalidEmailModalComponent,
    InvalidPhoneNumberModalComponent
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: true }),
    MatDialogModule,
    RoutingModule
  ],
  providers: [
    ContactService,
    ContactFeedService,
    BrowserStorage,
    PreferencesService,
    PreferencesAsyncService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

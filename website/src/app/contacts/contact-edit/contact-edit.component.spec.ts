import { DebugElement} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { FormsModule} from '@angular/forms';
import { Contact, ContactService, FavoriteIconDirective,
  InvalidEmailModalComponent, InvalidPhoneNumberModalComponent } from '../shared';

import { AppMaterialModule} from '../../app.material.module';
import { ContactEditComponent} from './contact-edit.component';


/* 'shallow' tests for the `ContactEditComponent`. Testing components only one level deep. */

describe('ContactEditComponent tests', () => {
  /* Use `ComponentFixture` to test and debug an element.*/
  let fixture: ComponentFixture<ContactEditComponent>;
  let component: ContactEditComponent;
  /* `DebugElement` can be used to inspect an element. It's like a native
     `HTMLElement` with additional methods and properties for debugging. */
  let rootElement: DebugElement;

  const contactServiceStub = {
    contact: {
      id: 1,
      name: 'janet'
    },

    save: async function(contact: Contact) {
      component.contact = contact;
    },

    getContact: async function() {
      component.contact = this.contact;
    },

    updateContact: async function(contact: Contact) {
      component.contact = contact;
    }
  };

  beforeEach(() => {
    /* `TestBed` is used for testing components, directives and services.
       It's one of the most important classes for testing Angular apps.
       Important methods are:
         - `configureTestingModule`
         - `overrideModule`
         - `createComponent`
       `TestBed.configureTestingModule` takes an object of type
       `TestModuleMetadata`. It's similar to `NgModule` in `app.module.ts`.
     */
    TestBed.configureTestingModule({
      // `declarations` (`any[]`): List of components needed in test.
      declarations: [ContactEditComponent, FavoriteIconDirective,
        InvalidEmailModalComponent, InvalidPhoneNumberModalComponent],
      // `imports` (`any[]`): modules that the tested component requires.
      imports : [
        AppMaterialModule,
        FormsModule,
        // Mock animations so we don't need to wait until they are finished
        NoopAnimationsModule,
        // Set up routing for tests
        RouterTestingModule
      ],
      // `providers` (`any[]`): Override providers that Angular uses for DI.
      // inject fake (`contactServiceStub)
      providers: [{provide: ContactService, useValue: contactServiceStub}]
      /* `schemas` (`Array<SchemaMetadata | any[]>`): Could be used for testing
         properties. Use `CUSTOM_ELEMENTS_SCHEMA`, `NO_ERRORS_SCHEMA`... */
    });

    /* `overrideModule` because the two modal dialogs need to be loaded lazily.
       `BrowserDynamicTestingModule` helps bootstrap the browser for testing. */
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [InvalidEmailModalComponent, InvalidPhoneNumberModalComponent]
      }
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEditComponent);
    component = fixture.componentInstance;
    // triggers change-detection cycle (similar to zones in production code)
    fixture.detectChanges();
    rootElement = fixture.debugElement;
  });

  describe('save contact()', () => {
    // use `fakeAsync` so the test doesn't finish before the production code is done.
    it('should display contact name after contact set', fakeAsync(() => {
      const contact = {
        id: 1,
        name: 'lorace'
      };

      // don't render the loading-progress bar
      component.isLoading = false;
      // call the function to test
      component.saveContact(contact);
      /* Needs to be called manually after making changes to components, so
         that the changes are rendered. */
      fixture.detectChanges();
      /* `By` is a class that lets you select DOM elements.
         Important methods:
           - `all` (parameter: None): return all elements
           - `css` (parameter: CSS attribute): return elements with given attribute
           - `directive` (parameter: directive name): return elements selected by directive name */
      const nameInput = rootElement.query(By.css('.contact-name'));
      // Simulate passage of time.
      tick();
      // `nativeElement`: Angular wrapper around DOM native element.
      expect(nameInput.nativeElement.value).toBe('lorace');
    }));
  });

  describe('load contact()', () => {
    // use `fakeAsync` so the test doesn't finish before the production code is done.
    it('should load contact', fakeAsync(() => {

      // don't render the loading-progress bar
      component.isLoading = false;
      // call the function to test
      component.loadContact();
      /* Needs to be called manually after making changes to components, so
         that the changes are rendered. */
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      // Simulate passage of time.
      tick();
      expect(nameInput.nativeElement.value).toBe('janet');
    }));
  });

  describe('updateCcontact() test', () => {
    // use `fakeAsync` so the test doesn't finish before the production code is done.
    it('should update the contact', fakeAsync(() => {
      const newContact = {
        id: 1,
        name: 'delia',
        email: 'delia@example.com',
        number: '1234567890'
      };

      component.contact = {
        id: 2,
        name: 'rhonda',
        email: 'rhonda@example.com',
        number: '1234567890'
      };

      // don't render the loading-progress bar
      component.isLoading = false;

      /* Needs to be called manually after making changes to components, so
         that the changes are rendered. */
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      tick();
      expect(nameInput.nativeElement.value).toBe('rhonda');

      // Call the function to test
      component.updateContact(newContact);
      /* Needs to be called manually after making changes to components, so
         that the changes are rendered. */
      fixture.detectChanges();

      // Simulate passage of time. Wait for `updateContact` to finish.
      tick(100);
      expect(nameInput.nativeElement.value).toBe('delia');
    }));

    // use `fakeAsync` so the test doesn't finish before the production code is done.
    it('should not update the contact if email is invalid', fakeAsync(() => {
      const newContact = {
        id: 1,
        name: 'delia',
        email: 'london@example',
        number: '1234567890'
      };

      component.contact = {
        id: 2,
        name: 'chauncey',
        email: 'chauncey@example.com',
        number: '1234567890'
      };

      // don't render the loading-progress bar
      component.isLoading = false;

      /* Needs to be called manually after making changes to components, so
         that the changes are rendered. */
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      tick();
      expect(nameInput.nativeElement.value).toBe('chauncey');

      // Call the function to test
      component.updateContact(newContact);
      /* Needs to be called manually after making changes to components, so
         that the changes are rendered. */
      fixture.detectChanges();

      // Simulate passage of time. Wait for `updateContact` to finish.
      tick(100);
      expect(nameInput.nativeElement.value).toBe('chauncey');
    }));

    // use `fakeAsync` so the test doesn't finish before the production code is done.
    it('should not update the contact if phone number is invalid', fakeAsync(() => {
      const newContact = {
        id: 1,
        name: 'delia',
        email: 'london@example.com',
        number: '12345678901'
      };

      component.contact = {
        id: 2,
        name: 'chauncey',
        email: 'chauncey@example.com',
        number: '1234567890'
      };

      // don't render the loading-progress bar
      component.isLoading = false;

      /* Needs to be called manually after making changes to components, so
         that the changes are rendered. */
      fixture.detectChanges();
      const nameInput = rootElement.query(By.css('.contact-name'));
      tick();
      expect(nameInput.nativeElement.value).toBe('chauncey');

      // Call the function to test
      component.updateContact(newContact);
      /* Needs to be called manually after making changes to components, so
         that the changes are rendered. */
      fixture.detectChanges();

      // Simulate passage of time. Wait for `updateContact` to finish.
      tick(100);
      expect(nameInput.nativeElement.value).toBe('chauncey');
    }));
  });
});

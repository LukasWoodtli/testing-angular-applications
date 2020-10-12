import { Component, OnInit } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed, async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';


/* Test how the component behaves with data from the router */
@Component({
  selector: `contact-edit`,
  template: `<div class="contact-id">{{ contactId }}</div>`
})
class ContactEditComponent implements OnInit {
  private contactId: number;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.contactId = id;
    });
  }
}

/* This test doesn't use `RouterTestingModule`.
   It isn't necessary because no navigation happens. */

describe('Testing activated routes wit observables', () => {
  let fixture;
  const paramsMock = Observable.create((observer) => {
    observer.next({
      id: 'aMockId'
    });
    observer.complete();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: {params: paramsMock}}
      ],
      declarations: [ContactEditComponent]
    });
  });

  // needs to by in `async` helper as the test waits for component to initialize
  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContactEditComponent);
    fixture.detectChanges();
  }));

  it('Tries to route to a page', async(() => {
    const testEl = fixture.debugElement.query(By.css('div'));
    expect(testEl.nativeElement.textContent).toEqual('aMockId');
  }));
});

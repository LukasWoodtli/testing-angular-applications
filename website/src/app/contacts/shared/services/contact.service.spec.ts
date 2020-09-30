import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ContactService} from './contact.service';
import {TestBed} from '@angular/core/testing';


/* When using `HttpClientTestingModule` no `fakeAsync` or call to the `done` callback is needed. */

describe('Contact service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService]
    });
  });

  describe('getContacts', () => {
    let contactService: ContactService;
    let httpTestingController: HttpTestingController;
    let mockContact: any;

    beforeEach(() => {
     contactService = TestBed.get(ContactService);
      httpTestingController = TestBed.get(HttpTestingController);
      mockContact = {
        id: 100,
        name: 'Erin Dee',
        email: 'edee@example.com'
      };
    });

    it('should GET a list of contacts', () => {
      /* Call the function to test.
         It is executed asynchronously as it returns an `Observable`. */
      contactService.getContacts().subscribe((contacts) => {
        expect(contacts[0]).toEqual(mockContact);
      });

      const request = httpTestingController.expectOne('app/contacts');
      // Send a response by calling `flush` on the request object and provide it an object
      request.flush([mockContact]);
      // to verify no connections to the backend are pending or unresolved.
      httpTestingController.verify();
    });
  });
});

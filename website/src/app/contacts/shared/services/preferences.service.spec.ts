import { TestBed, inject } from '@angular/core/testing';
import { PreferencesService } from './preferences.service';
import {BrowserStorage} from './BrowserStorage';

class BrowserStorageMock {
  getItem = (property: string) => ({ key: 'testProp', value: 'testValue'});
  setItem = ({ key: key, value: value}) => {};
}

describe('PreferenceService', () => {
  beforeEach(() => {
    // Inject `BrowserStorageMock` into `PreferencesService`
    TestBed.configureTestingModule({
      providers: [PreferencesService, {
        provide: BrowserStorage, useClass: BrowserStorageMock
      }]
    });
  });

  it('should be created', inject([PreferencesService], (service: PreferencesService) => {
    expect(service).toBeTruthy();
  }));

  describe('save preferences',() => {
    // use `inject` to get the `PreferencesService` and `BrowserStorageMock` objects
    it('should save a preference', inject([PreferencesService, BrowserStorage],
      (service: PreferencesService, browserStorage: BrowserStorageMock) => {
      // Spy on the `setItem` method
      spyOn(browserStorage, 'setItem').and.callThrough();
      // Call function to test
      service.saveProperty({key: 'myProperty', value: 'myValue'});
      // Check the spy
      expect(browserStorage.setItem).toHaveBeenCalledWith('myProperty', 'myValue');
      })
    );

    it('should require a non-zero length key', inject([PreferencesService], (service: PreferencesService) => {
      const shouldThrow = () => {
        service.saveProperty({key: '', value: 'foo'});
      };

      expect(shouldThrow).toThrowError();
    }));
  });
});

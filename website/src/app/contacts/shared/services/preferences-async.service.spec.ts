import {TestBed, inject, fakeAsync, flushMicrotasks} from '@angular/core/testing';
import {PreferencesAsyncService} from './preferences-async.service';
import {BrowserStorageAsync} from './BrowserStorage';

// The mocks need to be async. Reflecting the real objects.
class BrowserStorageAsyncMock {
  getItem = (property: string) => {
    return Promise.resolve({key: 'testProp', value: 'testValue'});
  };
  setItem = ({key: key, value: value}) => Promise.resolve(true);
}


describe('PreferencesAsyncService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreferencesAsyncService, {
        provide: BrowserStorageAsync, useClass: BrowserStorageAsyncMock
      }]
    });
  });

  /* Use `fakeAsync` to test asynchronous code and
     `inject` to inject fakes (mocks) into the code. */
  it('should get a value', fakeAsync(inject(
    [PreferencesAsyncService, BrowserStorageAsync],
    (service: PreferencesAsyncService,
        browserStorage: BrowserStorageAsyncMock) => {
      spyOn(browserStorage, 'getItem').and.callThrough();

      let results, error;

      // invoke the async code to test
      service.getPropertyAsync('testProp').then(val => results = val).catch(err => error = err);

      // Let Angular know tho process the promises in the test
      flushMicrotasks();

      expect(results.key).toEqual('testProp');
      expect(results.value).toEqual('testValue');
            expect(browserStorage.getItem).toHaveBeenCalledWith('testProp');
      expect(error).toBeUndefined();
      expect(browserStorage.getItem).toHaveBeenCalledWith('testProp');
    }))
  );

  it('should throw an error if the key is missing', fakeAsync(inject(
    [PreferencesAsyncService], (service: PreferencesAsyncService) => {
      let result, error;
      service.getPropertyAsync('').then(value => result = value).catch(err => error = err);

      flushMicrotasks();

      expect(result).toBeUndefined();
      expect(error).toEqual('getPropertyAsync requires a property name');
    })
  ));
});

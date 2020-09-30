import { Injectable } from '@angular/core';
import {BrowserStorage} from "./BrowserStorage";

export interface IContactPreference {
  key: string;
  value: string | object;
}

@Injectable()
export class PreferencesService {

  constructor(private browserStorage: BrowserStorage) { }

  public saveProperty(preference: IContactPreference) {
    if (!(preference.key && preference.key.length)) {
      throw new Error('saveProperty requires a non-blank property name');
    }
    this.browserStorage.setItem(preference.key, preference.value);
  }

}

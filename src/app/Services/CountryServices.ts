import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {CountryModel} from '../Models/CountryModel';
import {of} from 'rxjs/observable/of';
import * as Config from '../Config/Config';

@Injectable()
export class CountryServices {
  constructor(private http: HttpClient) {
  }

  getCountries(): Observable<CountryModel[]> {
    const config = Config ? Config.default : {};
    const env = config.env;
    const apiRoot = config[env].apiRoot;
    const url = apiRoot + config.apiSrvCountries;
    return this.http.get<CountryModel[]>(url)
      .pipe(
        tap(countries => this.log(`fetched countries`)),
        catchError(this.handleError('getCountries', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.log(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    // console.log(message);
  }
}

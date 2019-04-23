import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {EventModel} from '../Models/EventModel';
import {of} from 'rxjs/observable/of';
import * as Config from '../Config/Config';

@Injectable()

export class EventServices {
  constructor(private http: HttpClient) {
  }

  getEvent(): Observable<EventModel[]> {
    const config = Config ? Config.default : {};
    const env = config.env;
    const apiRoot = config[env].apiRoot;
    let url = apiRoot + config.apiSrvEvent;
    url = url.replace('{siteId}', 1);
    return this.http.get<EventModel[]>(url)
      .pipe(
        tap(event => this.log(`fetched event`)),
        catchError(this.handleError('getEvent', []))
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

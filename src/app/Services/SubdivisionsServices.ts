import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {SubdivisionsModel} from '../Models/SubdivisionsModel';
import {of} from 'rxjs/observable/of';
import * as Config from '../Config/Config';

@Injectable()
export class SubdivisionsServices {
  constructor(private http: HttpClient) {
  }

  getSubdivisions(id): Observable<SubdivisionsModel[]> {
    const config = Config ? Config.default : {};
    const env = config.env;
    const apiRoot = config[env].apiRoot;
    let url = apiRoot + config.apiSrvSubdivisions;
    url = url.replace('{subdivisionId}', id);
    return this.http.get<SubdivisionsModel[]>(url)
      .pipe(
        tap(subdivisions => this.log('fetched subdivisions')),
        catchError(this.handleError('getSubdivisions', []))
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

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import * as Config from '../Config/Config';
import {ContactUs} from '../Models/ContactUs';

@Injectable()
export class ContactUsServices {
  constructor(private http: HttpClient) {
  }

  setContact(person: ContactUs): Observable<any> {
    const config = Config ? Config.default : {};
    const env = config.env;
    const apiRoot = config[env].apiRoot;
    const url = apiRoot + config.apiSrvSend;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const params = {
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      city: person.country,
      subdivision: person.subdivision,
      phone: person.phone,
      description: person.description
    };
    return this.http.post(url, params, httpOptions);
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

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Carousel} from '../Models/Carousel';
import {of} from 'rxjs/observable/of';
import * as Config from '../Config/Config';

@Injectable()
export class CarouselServices {
  constructor(private http: HttpClient) {
  }

  getCarousel(): Observable<Carousel[]> {
    const config = Config ? Config.default : {};
    const env = config.env;
    const apiRoot = config[env].apiRoot;
    let url = apiRoot + config.apiSrvCarousel;
    url = url.replace('{siteId}', 1);
    return this.http.get<Carousel[]>(url)
      .pipe(
        tap(carousel => this.log(`fetched carousel`)),
        catchError(this.handleError('getCarousel', []))
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

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ProductModel} from '../Models/ProductModel';
import {of} from 'rxjs/observable/of';
import * as Config from '../Config/Config';

@Injectable()

export class ProductServices {
  constructor(private http: HttpClient) {
  }

  getProduct(id): Observable<ProductModel[]> {
    const config = Config ? Config.default : {};
    const env = config.env;
    const apiRoot = config[env].apiRoot;
    let url = apiRoot + config.apiSrvProduct;
    url = url.replace('{productCategoryId}', id);
    url = url.replace('{siteId}', 1);
    return this.http.get<ProductModel[]>(url)
      .pipe(
        tap(event => this.log(`fetched product`)),
        catchError(this.handleError('getProduct', []))
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

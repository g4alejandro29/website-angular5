import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ProductCategoryModel} from '../Models/ProductCategoryModel';
import {of} from 'rxjs/observable/of';
import * as Config from '../Config/Config';

@Injectable()

export class ProductCategoryServices {
  constructor(private http: HttpClient) {
  }

  getProductCategory(): Observable<ProductCategoryModel[]> {
    const config = Config ? Config.default : {};
    const env = config.env;
    const apiRoot = config[env].apiRoot;
    let url = apiRoot + config.apiSrvProductCategory;
    url = url.replace('{siteId}', 1);
    return this.http.get<ProductCategoryModel[]>(url)
      .pipe(
        tap(productCategory => this.log(`fetched product category`)),
        catchError(this.handleError('getProductCategory', []))
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

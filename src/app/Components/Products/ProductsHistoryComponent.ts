import {Component, OnInit} from '@angular/core';
import {ProductCategoryServices} from '../../Services/ProductCategoryServices';
import * as Config from '../../Config/Config.js';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-product-history',
  templateUrl: '../../Views/Products/ProductHistoryComponent.html',
  styleUrls: ['../../../assets/scss/catalogo.scss'],
  providers: [ProductCategoryServices]
})

export class ProductsHistoryComponent implements OnInit {
  constructor(
    private _productCategory: ProductCategoryServices,
    private ng4Services: NgxSpinnerService
  ) {
  }

  public productCategories: Array<object> = [];

  getProductCategory() {
    const config = Config ? Config.default : {};
    const notFound = config.notFound;
    this.ng4Services.show();
    this._productCategory.getProductCategory()
      .subscribe(response => {
        const data = response ? response['data'] : [];
        if (data) {
          for (const item of data) {
            this.productCategories.push({
              id: item.id,
              image: item.image || notFound,
              name: item.name
            });
            this.ng4Services.hide();
          }
        }
      });
  }

  ActiveLoad() {
    this.ng4Services.show();
  }

  LoadData() {
    return Promise
      .resolve()
      .then(() => {
        return this.getProductCategory();
      })
      .catch(err => {
        throw err;
      });
  }

  ngOnInit() {
    return this.LoadData();
  }
}

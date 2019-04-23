import {Component, OnInit} from '@angular/core';
import {ProductServices} from '../../Services/ProductServices';
import {ActivatedRoute} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {CountryServices} from '../../Services/CountryServices';
import {SubdivisionsServices} from '../../Services/SubdivisionsServices';
import {Validator} from 'validator.ts/Validator';
import { AlertifyService } from '../../Services/AlertifyService';

import * as Config from '../../Config/Config.js';
import {ContactUs} from '../../Models/ContactUs';
import {ContactUsServices} from '../../Services/ContactUsServices';

@Component({
  selector: 'app-product-detail',
  templateUrl: '../../Views/Products/ProductDetailComponent.html',
  styleUrls: ['../../../assets/scss/ProductDetail.scss'],
  providers: [ProductServices, CountryServices, SubdivisionsServices, AlertifyService, ContactUsServices]
})

export class ProductDetailComponent implements OnInit {
  title: string;
  image: string;
  products: Array<object> = [];
  product: Object;
  productId;
  modal: Boolean = false;
  validator = new Validator();
  contact = new ContactUs(null, null, null, null, null, null, null);
  firstName: string = null;
  lastName: string = null;
  email: string = null;
  country: Number = 0;
  subdivision: Number = 0;
  phone: string = null;
  description: string = null;
  countries = [];
  subdivisions = [];
  submitted = false;
  firstNameError: string;
  lastNameError: String;
  emailError: String;

  constructor(
    private _product: ProductServices,
    private route: ActivatedRoute,
    private ng4Services: NgxSpinnerService,
    private _country: CountryServices,
    private _subdivions: SubdivisionsServices,
    private alertify: AlertifyService,
    private _contact: ContactUsServices
  ) {
  }

  showModal() {
    this.modal = true;
  }

  hiddenModal() {
    this.modal = false;
  }

  showProduct(e, i) {
    this.productId = i;
    this.product = e;
  }

  ngOnInit() {
    this.loadData();
  }
  getCountries() {
    this._country.getCountries()
      .subscribe(response => {
        const data = response ? response['data'] : [];
        for (const item of data) {
          this.countries.push({
            id: item.id,
            name: item.name
          });
        }
      });
  }

  getSubdivisions(id) {
    if (id > 0) {
      this._subdivions.getSubdivisions(id)
        .subscribe(response => {
          const data = response ? response['data'] : [];
          for (const item of data) {
            this.subdivisions.push({
              id: item.id,
              name: item.name
            });
          }
        });
    } else {
      this.contact.subdivision = null;
    }
  }
  loadData() {
    return Promise
      .resolve()
      .then(() => {
        this.getCountries();
      })
      .then(() => {
        this.getProduct();
      })
      .catch(err => {
        throw err;
      });
  }

  getProductId() {
    const id = this.route.snapshot.params.id;
    return id;
  }

  getImg() {
    const img = this.image;
    return img;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.validForm()) {
      return false;
    }
    let country = null;
    let subdivision = null;
    if (this.country > 0) {
      for (const item of this.countries) {
        const id = item.id + '';
        const countryItem = this.country + '';
        if (id === countryItem) {
          country = item.name;
        }
      }
    }
    if (this.subdivision > 0) {
      for (const item of this.subdivisions) {
        const subdivisionItem = this.subdivision + '';
        const id = item.id + '';
        if (id === subdivisionItem) {
          subdivision = item.name;
        }
      }
    }
    this.contact = new ContactUs(this.firstName, this.lastName, this.email, country, subdivision, this.phone, this.description);
    return this._contact.setContact(this.contact)
      .subscribe(() => {
        this.alertify.success('Enviado exitosamente');
        this.lastName = null;
        this.firstName = null;
        this.phone = null;
        this.email = null;
        this.country = 0;
        this.subdivision = 0;
        this.description = null;
        this.contact = new ContactUs(null, null, null, null, null, null, null);
        this.submitted = false;
      });
  }


  validForm() {
    this.contact.firstName = this.contact.firstName || '';
    this.contact.lastName = this.contact.lastName || '';
    this.contact.email = this.contact.email || '';
    return (this.lastNameIsValid() && this.firstNameIsValid() && this.emailIsValid());
  }

  getProduct() {
    const config = Config ? Config.default : {};
    const notFound = config.notFound;
    this.ng4Services.show();
    this._product.getProduct(this.getProductId())
      .subscribe(response => {
        if (response) {
          const data = response ? response['data'] : [];
          this.title = response ? response['title'] : null;
          this.image = response ? response['image'] : notFound;
          for (const item of data) {
            if (item['id'] && item['name']) {
              this.products.push(item);
            }
          }
          this.ng4Services.hide();
        }
      });
  }

  /// validations
  firstNameIsSet() {
    return (this.contact.firstName !== null);
  }

  firstNameIsValid() {
    if (!this.contact.firstName && this.firstNameIsSet()) {
      this.firstNameError = 'Nombres requerido';
      return false;
    }
    this.firstNameError = null;
    return true;
  }

  firstNameIsSuccess() {
    return (this.firstNameIsSet() && this.firstNameIsValid());
  }

  firstNameIsDanger() {
    return (this.firstNameIsSet() && !this.firstNameIsValid());
  }

  updateFirstName(value) {
    this.contact.firstName = value;
  }

  lastNameIsSet() {
    return (this.contact.lastName !== null);
  }

  lastNameIsValid() {
    if (!this.contact.lastName && this.lastNameIsSet()) {
      this.lastNameError = 'Apellidos requeridos';
      return false;
    }
    this.lastNameError = null;
    return true;
  }

  lastNameIsSuccess() {
    return (this.lastNameIsSet() && this.lastNameIsValid());
  }

  lastNameIsDanger() {
    return (this.lastNameIsSet() && !this.lastNameIsValid());
  }

  updateLastName(value) {
    this.contact.lastName = value;
  }

  updateCountry(value) {
    this.contact.country = value;
    this.getSubdivisions(this.contact.country);
  }

  updateDescription(value) {
    this.contact.description = value;
  }

  emailIsSet() {
    return (this.contact.email !== null);
  }

  emailIsValid() {
    if (!this.emailIsSet() || this.contact.email.trim().length <= 0) {
      this.emailError = 'Debe ingresar el correo electrónico';
      return false;
    }
    if (!this.validator.isEmail(this.contact.email, {})) {
      this.emailError = 'Debe ingresar un correo electrónico valido';
      return false;
    }
    this.emailError = null;
    return true;
  }

  emailIsSuccess() {
    return (this.emailIsSet() && this.emailIsValid());
  }

  emailIsDanger() {
    return (this.emailIsSet() && !this.emailIsValid());
  }

  updateEmail(value) {
    this.contact.email = value;
  }

  updatePhone(value) {
    this.contact.phone = value;
  }

  updateSubdivision(value) {
    this.contact.subdivision = value;
  }
}

import {Component, OnInit} from '@angular/core';
import {ContactUs} from '../Models/ContactUs';
import {CountryServices} from '../Services/CountryServices';
import {SubdivisionsServices} from '../Services/SubdivisionsServices';
import {Validator} from 'validator.ts/Validator';
import {AlertifyService} from '../Services/AlertifyService';
import {ContactUsServices} from '../Services/ContactUsServices';

@Component({
  selector: 'app-contact',
  templateUrl: '../Views/ContactComponent.html',
  styleUrls: ['../../assets/scss/contact.scss'],
  providers: [CountryServices, SubdivisionsServices, AlertifyService, ContactUsServices]
})
export class ContactComponent implements OnInit {
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
  lastNameError: string;
  emailError: string;

  constructor(
    private _country: CountryServices,
    private _subdivions: SubdivisionsServices,
    private alertify: AlertifyService,
    private _contact: ContactUsServices
  ) {
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
      this.subdivision = 0;
    }
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
    this.firstName = this.firstName || '';
    this.lastName = this.lastName || '';
    this.email = this.email || '';
    return (this.lastNameIsValid() && this.firstNameIsValid() && this.emailIsValid());
  }

  /// validations
  firstNameIsSet() {
    return (this.firstName !== null);
  }

  firstNameIsValid() {
    if (!this.firstName && this.firstNameIsSet()) {
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
    this.firstName = value;
  }

  lastNameIsSet() {
    return (this.lastName !== null);
  }

  lastNameIsValid() {
    if (!this.lastName && this.lastNameIsSet()) {
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
    this.lastName = value;
  }

  updateCountry(value) {
    this.country = value;
    this.getSubdivisions(this.country);
  }

  updateDescription(value) {
    this.description = value;
  }

  emailIsSet() {
    return (this.email !== null);
  }

  emailIsValid() {
    if (!this.emailIsSet() || this.email.trim().length <= 0) {
      this.emailError = 'Debe ingresar el correo electrónico';
      return false;
    }
    if (!this.validator.isEmail(this.email, {})) {
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
    this.email = value;
  }

  updatePhone(value) {
    this.phone = value;
  }

  updateSubdivision(value) {
    this.subdivision = value;
  }

  ngOnInit() {
    this.getCountries();
  }
}

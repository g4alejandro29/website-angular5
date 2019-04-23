import {Component, Input, Output, EventEmitter} from '@angular/core';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-form-textarea',
  templateUrl: '../../Views/Common/FormTextareaComponent.html'
})

export class FormTextareaComponent {
  @Input() value: string;
  @Input() isDanger: false;
  @Input() isSuccess: false;
  @Input() isSubmit: false;
  @Input() isRequired: false;
  @Input() errorMsg: string;
  @Input() icon: string;
  @Input() maxLength: Number = 10000;
  @Input() label: string;
  @Input() error: String;
  @Input() isType: String = 'text';
  @Input() placeHolder: String = '';
  @Output() input: EventEmitter<any> = new EventEmitter<any>();
  placeHolders: Boolean = true;

  focus(value) {
    return this.placeHolders = value;
  }

  PlaceHolders() {
    if (this.placeHolders) {
      return this.placeHolder;
    }
    return '';
  }

  constructor(private _sanitizer: DomSanitizer) {
  }

  getStyle() {
    if (this.icon && this.icon.length > 0) {
      return this._sanitizer.bypassSecurityTrustStyle(`padding-left: 35px;`);
    }
    return '';
  }

  updateValue(value) {
    if (value) {
      this.input.emit(value);
    }
  }
}

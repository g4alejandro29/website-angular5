import {Component} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-footer-component',
  templateUrl: '../../Views/Page/FooterComponent.html',
  styleUrls: ['../../../assets/scss/footer.scss']
})

export class FooterComponent {
  public date: string = null;

  getDate() {
    this.date = moment().format('Y');
    return this.date;
  }
}

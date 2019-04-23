import {Component, OnInit} from '@angular/core';
import {EventServices} from '../Services/EventServices';
import {NgxSpinnerService} from 'ngx-spinner';
import * as Config from '../Config/Config.js';
@Component({
  selector: 'app-news-component',
  templateUrl: '../Views/NewsComponent.html',
  styleUrls: ['../../assets/scss/news.scss'],
  providers: [EventServices]
})

export class NewsComponent implements OnInit {
  public News: Array<object> = [];
  public events: Array<object> = [];

  constructor(
    private _event: EventServices,
    private ng4Services: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    this.getEvent();
  }

  getEvent() {
    const config = Config ? Config.default : {};
    const notFound = config.notFound;
    this.ng4Services.show();
    this._event.getEvent()
      .subscribe(response => {
        const data = response ? response['data'] : [];
        if (data) {
          for (const item of data) {
            this.events.push({
              id: item.id,
              image: item.image || notFound,
              title: item.title,
              description: item.description
            });
          }
        }
        this.ng4Services.hide();
      });
  }
}

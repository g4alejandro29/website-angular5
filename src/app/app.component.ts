import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private amount = 50;
  private size = 5;
  private speed = 1.5;
  private wind = 0;
  private color = '#000';
  private opacity = 0.8;
  private swing = 1;
  private image = '';
  private zIndex = 1;

  constructor() {}
  ngOnInit() {
  }
}

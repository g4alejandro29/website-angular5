import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-component',
  templateUrl: '../Views/HomeComponent.html'
})

export class HomeComponent implements OnInit {
  public title = 'Inicio';

  ngOnInit() {
  }
}

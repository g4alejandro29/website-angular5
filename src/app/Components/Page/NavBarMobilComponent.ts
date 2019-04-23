import {Component} from '@angular/core';

@Component({
  selector: 'app-nav-bar-mobil',
  templateUrl: '../../Views/Page/NavBarMobilComponent.html',
  styleUrls: ['../../../assets/scss/menuMobil.scss']
})

export class NavBarMobilComponent {
  showMenu: Boolean = false;

  menu() {
    if (this.showMenu) {
      this.showMenu = false;
    } else {
      this.showMenu = true;
    }
  }

  option() {
    this.showMenu = false;
  }
}

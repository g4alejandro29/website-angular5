import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card-new-component',
  templateUrl: '../../Views/News/CardNewComponent.html',
  styleUrls: ['../../../assets/scss/card.scss']
})

export class CardNewComponent {
  @Input() card: any;

  getTitle() {
    const title = this.card ? this.card.title : '';
    return title;
  }

  getImg() {
    const img = this.card ? this.card.image : null;
    return img;
  }

  getDescription() {
    const description = this.card ? this.card.description : '';
    return description;
  }
}

import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: '../../Views/Products/CardProductComponent.html',
  styleUrls: ['../../../assets/scss/CardProduct.scss']
})

export class CardProductComponent {
  @Input() card: String;

  constructor(private router: Router) {}
  getTitle() {
    const title = this.card ? this.card['name'] : null;
    return title;
  }

  getImg() {
    const img = this.card ? this.card['image'] : null;
    return img;
  }

  getProductId() {
    const productId = this.card ? this.card['id'] : null;
    this.router.navigate(['/products/', productId]);
  }
}

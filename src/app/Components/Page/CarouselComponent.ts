import {Component, OnInit} from '@angular/core';
import {CarouselServices} from '../../Services/CarouselServices';
import {EventServices} from '../../Services/EventServices';
import {NgxSpinnerService} from 'ngx-spinner';
import * as Config from '../../Config/Config.js';
import {DomSanitizer} from '@angular/platform-browser';

declare var jQuery: any;

@Component({
  selector: 'app-carousel-component',
  templateUrl: '../../Views/Page/CarouselComponent.html',
  styleUrls: ['../../../assets/scss/carousel.scss'],
  providers: [CarouselServices, EventServices]
})

export class CarouselComponent implements OnInit {
  private title = 'Carousel';
  public keyCarousel: any = 1;
  public carouselData: Array<object> = [];
  public events: Array<object> = [];
  public images: Array<object> = [
    {
      path: '../../../assets/img/fondo1.png',
      icon: '../../../assets/img/icon5.png',
      text: 'LUBRICANTES EN DIFERENTES MARCAS',
      style: {
        'border-bottom': 'solid',
        'width': '80%',
        'font-size': '28px'
      }
    },
    {
      path: '../../../assets/img/fondo2.png',
      icon: '../../../assets/img/icon1.png',
      text: 'REPUESTOS',
      style: {
        'border-top': 'solid',
        'border-bottom': 'solid'
      }
    },
    {
      path: '../../../assets/img/fondo3.png',
      icon: '../../../assets/img/icon3.png',
      text: 'FILTRO DE ACEITE AIRE, GASOLINA, CAJA',
      style: {
        'border-bottom': 'solid',
        'width': '80%',
        'font-size': '28px'
      },
      note: {
        text: this.sanitized.bypassSecurityTrustHtml(
          '<label style="color:#014575;">Para todo tipo de vehículo y modelos desde 1960</label>'),
        style: {
          color: 'lightblue'
        }
      }
    },
    {
      path: '../../../assets/img/fondo4.png',
      icon: '../../../assets/img/icon4.png',
      text: this.sanitized.bypassSecurityTrustHtml(
        'HAZ TUS PEDIDOS POR WHATSAPP </br>' +
        '<label style="background: #fff;color:#016908;text-shadow: none!important;font-weight: bold;">AL 5557-3014</label>'),
      style: {
        'width': '80%',
        'font-size': '28px'
      },
      style2: {
        'width': '80%',
        'background': '#fff',
        'font-size': '28px'
      }
    },
    {
      path: '../../../assets/img/fondo5.png',
      icon: '../../../assets/img/icon-dicarsa.png',
      text: this.sanitized.bypassSecurityTrustHtml(
        'TENEMOS TODO LO QUE TU</br>' +
        '<label style="background: #fff;color:#01183f;font-weight: bold;text-shadow: none!important;"> VEHICULO NECESITA</label>'),
      style: {
        'width': '80%',
        'font-size': '28px'
      }
    }
  ];
  public interval: any = null;

  getNoteText(item = {}) {
    const Note = item['note'] ? item['note'] : null;
    const text = Note ? Note['text'] : null;
    return text;
  }

  constructor(
    private spinnerService: NgxSpinnerService,
    private _carousel: CarouselServices,
    private _event: EventServices,
    private sanitized: DomSanitizer
  ) {
  }

  getStyle(item) {
    const data = item ? item : null;
    const style = data.style ? data.style : null;
    return style;
  }

  ngOnInit() {
    this.autoNext();
    this.loadData();
    this.getCarousel();
  }

  loadData() {
    return Promise
      .resolve()
      .then(() => {
        return this.spinnerService.show();
      })
      .then(() => {
        return this.getCarousel();
      })
      .then(() => {
        const self = this;
        setTimeout(function () {
          self.spinnerService.hide();
        }, 1000);
      })
      .catch(err => {
        throw err;
      });
  }

  autoNext() {
    const self = this;
    if (this.images.length > 0) {
      this.interval = setInterval(function () {
        self.timeImg();
      }, 7000);
    }
  }

  setCarousel(e) {
    this.keyCarousel = e;
    clearInterval(this.interval);
  }

  timeImg() {
    if (this.images.length > 0) {
      if (this.keyCarousel < this.images.length) {
        const key: any = this.keyCarousel;
        const result: any = key + 1;
        this.keyCarousel = result;
      } else {
        this.keyCarousel = 1;
      }
    }
  }

  getCarousel() {
    this._carousel.getCarousel()
      .subscribe(response => {
        const config = Config ? Config.default : {};
        const notFound = config.notFound;
        const data = response ? response['data'] : [];
        if (data) {
          this.carouselData = [];
          for (const item of data) {
            this.carouselData.push({
              path: item.image || notFound
            });
          }
        }
      });
  }

  nextImg() {
    if (this.keyCarousel < this.images.length) {
      const key: any = this.keyCarousel;
      const result: any = key + 1;
      this.keyCarousel = result;
    } else {
      this.keyCarousel = 1;
    }
    clearInterval(this.interval);
  }

  previewImg() {
    if (this.keyCarousel > 1) {
      const key: any = this.keyCarousel;
      const result: any = key - 1;
      this.keyCarousel = result;
    } else {
      this.keyCarousel = this.images.length;
    }
    clearInterval(this.interval);
  }
}

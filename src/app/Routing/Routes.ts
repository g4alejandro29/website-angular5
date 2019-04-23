import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CarouselModule} from 'ngx-bootstrap';
import {CarouselComponent} from '../Components/Page/CarouselComponent';
import fontawesome from '@fortawesome/fontawesome';
import regular from '@fortawesome/fontawesome-free-regular';
import solid from '@fortawesome/fontawesome-free-solid';
import brands from '@fortawesome/fontawesome-free-brands';
import {AgmCoreModule} from '@agm/core';
import {FormsModule} from '@angular/forms';
// import component
import {HomeComponent} from '../Components/HomeComponent';
import {KnowUsComponent} from '../Components/KnowUsComponent';
import {ProductsComponent} from '../Components/ProductsComponent';
import {ProductsHistoryComponent} from '../Components/Products/ProductsHistoryComponent';
import {ProductDetailComponent} from '../Components/Products/ProductDetailComponent';
import {ServicesComponent} from '../Components/ServicesComponent';
import {ContactComponent} from '../Components/ContactComponent';
import {NewsComponent} from '../Components/NewsComponent';
import {CardNewComponent} from '../Components/News/CardNewComponent';
import {CardProductComponent} from '../Components/Products/CardProductComponent';
import {NotFoundComponent} from '../Components/NotFoundComponent';
import {FormInputComponent} from '../Components/Common/FormInputComponent';
import {FormSelectComponent} from '../Components/Common/FormSelectComponent';
import {FormTextareaComponent} from '../Components/Common/FormTextareaComponent';
import {NgxSpinnerModule} from 'ngx-spinner';

fontawesome.library.add(regular);
fontawesome.library.add(solid);
fontawesome.library.add(brands);

const routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'know-us', component: KnowUsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/:id', component: ProductDetailComponent},
  {path: 'contact', component: ContactComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    CarouselComponent,
    HomeComponent,
    CarouselComponent,
    KnowUsComponent,
    ProductsComponent,
    ProductsHistoryComponent,
    ServicesComponent,
    ContactComponent,
    NewsComponent,
    CardNewComponent,
    CardProductComponent,
    ProductDetailComponent,
    NotFoundComponent,
    FormInputComponent,
    FormSelectComponent,
    FormTextareaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(
      routes,
      {enableTracing: false}
    ),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBB7ETSIlpeIp4p1XqTKxKOHK-ygXEUUps'
    }),
    NgxSpinnerModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

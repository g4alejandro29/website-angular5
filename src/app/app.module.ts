import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './Routing/Routes';
import {AppComponent} from './app.component';
import {NavBarComponent} from './Components/Page/NavBarComponent';
import {NavBarDeskComponent} from './Components/Page/NavBarDeskComponent';
import {NavBarMobilComponent} from './Components/Page/NavBarMobilComponent';
import {FooterComponent} from './Components/Page/FooterComponent';
import {ChatComponent} from './Components/ChatComponent';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NavBarDeskComponent,
    NavBarMobilComponent,
    FooterComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

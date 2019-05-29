import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing,module';
import { MatCardModule, MatIconModule, MatGridListModule , MatProgressSpinnerModule , MatButtonModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

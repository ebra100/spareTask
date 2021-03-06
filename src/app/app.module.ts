import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import 'hammerjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing,module';
import { MatCardModule, MatIconModule, MatGridListModule, MatProgressSpinnerModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { OpenDialogComponent } from './OpenDialogt/open-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { EditOrAddProductComponent } from './edit-or-add-product/edit-or-add-product.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { MenuOrViewCartComponent } from './menu-or-view-cart/menu-or-view-cart.component';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    OpenDialogComponent,
    EditOrAddProductComponent,
    ViewCartComponent,
    MenuOrViewCartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxLoadingModule.forRoot({}),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule

  ],
  entryComponents: [
    OpenDialogComponent,
    EditOrAddProductComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

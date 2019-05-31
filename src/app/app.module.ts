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
import { EditProductComponent } from './edit-product/edit-product.component';
import { OpenDialogComponent } from './OpenDialogt/open-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    OpenDialogComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    EditProductComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

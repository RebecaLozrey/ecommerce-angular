import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { SharedModule } from 'shared/shared.module';

import { environment } from './../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    AdminModule,
    ShoppingModule,
    SharedModule,
    BrowserModule,
    

    //Module called just one no need to share it
    AngularFireModule.initializeApp(environment.firebase),

    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
    ])    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  logo:string = "../../../assets/images/logo150px.png";
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;


  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) { 
    auth.appUser$.subscribe( appUser => this.appUser = appUser);
  }
  
  async ngOnInit(){
  this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  this.cart$ = await this.shoppingCartService.getCart();

  }

  logout(){
   this.auth.logout();
  }

}

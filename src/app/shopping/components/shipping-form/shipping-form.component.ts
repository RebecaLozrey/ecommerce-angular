import { Component, OnInit, Input } from '@angular/core';
import { Shipping } from 'shared/models/shipping';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Order } from 'shared/models/order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  @Input ('cart') cart: ShoppingCart;
  authSubscription: Subscription;
  userId: string;
  result: any;
  shipping = <Shipping>{};


  constructor(  private router: Router,
                private orderService: OrderService,
                private authService: AuthService,) { }

  async placeOrder(){
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder( order );
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnInit() {
    this.authSubscription = this.authService.user$.subscribe( user => this.userId = user.uid );
  }
  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

}

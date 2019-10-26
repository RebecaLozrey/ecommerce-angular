import { Component } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  myOrders$;

  constructor( 
    private orderService: OrderService,
    private authService: AuthService,
    ) { 
    this.myOrders$ = authService.user$.switchMap( u =>
      orderService.getOrdersByUser(u.uid));
  }


}

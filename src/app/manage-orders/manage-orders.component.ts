import { Component } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrders {
  orders$: FirebaseListObservable<any[]>;

  constructor(private orderService: OrderService) {
   
   }

  async ngOnInit(){
    this.orders$ = await this.orderService.getOrders();
  }
   
}
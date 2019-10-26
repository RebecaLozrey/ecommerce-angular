import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Order } from 'shared/models/order';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { User } from 'firebase';


@Injectable()
export class OrderService {
  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  public async placeOrder( order: Order ){
    let result = await this.db.list('/orders').push( order );
    //let response = this.clearCart();
    return result;
  }

  public async getOrders(){
    return this.db.list('/orders');
  }

  private async clearCart(){
    return await this.shoppingCartService.clearCart();
  }

  getOrdersByUser( userId: string ){
    return this.db.list('/orders', { 
      query: { 
      orderByChild: 'userId', 
      equalTo: userId,
      }
    });
  }
}

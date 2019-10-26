import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from 'shared/models/product';
import 'rxjs/add/operator/take';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

// SERVICE API: Public Methods

  public async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).map( x => new ShoppingCart( x.items ) );
  }

  public async addToCart( product: Product ){
    this.updateItem( product, 1);
  }

  public async removeFromCart( product: Product ){
    this.updateItem( product, -1);

  }

  public async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  //  definition methods

  private async updateItem(product: Product, variation: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.$key);
    item$.take(1).subscribe(item => {
      //!!! here custom code not mosh'
      let newQuantity = (item.quantity || 0) + (variation);
      if (newQuantity === 0 ) item$.remove();
      else
      item$.update({ // flatened structure
        //product: product, 
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: newQuantity
      });



    });
  }


  private async getOrCreateCartId(): Promise<string>{
    //async methods return observables
        let cartId = localStorage.getItem('cartId');
        if(cartId) return cartId;
            let result = await this.create();
              localStorage.setItem('cartId', result.key);
              return result.key;
    
      }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

}

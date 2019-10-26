import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";
// interface declaration implements, classs definition of methods
export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    // from firebase we get an object not an array
    // maps are ordered objects and iterable
    //while objects are not ordered and are accessed with keys

    constructor(public itemsMap: { [productId: string]: ShoppingCartItem }){
        this.itemsMap = itemsMap || {};

        for (let productId in itemsMap ){
        let item = itemsMap[productId];
        /*
        let x = new ShoppingCartItem();
        Object.assign(x, item); // copu all properties of item to x
        x.$key= productId;
        this.items.push(x);
        */
        this.items.push(new ShoppingCartItem({...item, $key: productId}));
        }

    }

    // get quantity of a single product
    getQuantity( product: Product ){
        let item = this.itemsMap[product.$key];
        return item ? item.quantity : 0;
      }


    // Get the sum of all products totalPrice (from shopping-cart-item)
    get totalPrice(){
        let sum: number = 0;
        for ( let productId in this.items ){
            sum += this.items[productId].totalPrice;
        }
        return sum;
    }

    get totalItemsCount(){
        let count = 0;
        for (let productId in this.items)
            count += this.items[productId].quantity;
        return count;
    }


}
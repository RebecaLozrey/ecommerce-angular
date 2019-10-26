export class ShoppingCartItem {
    
$key: string;
title: string;
imageUrl: string;
price: number;
quantity: number;

// to init is a parameter that contains all arguments passed
// init? es opcional
// del tipo parcial de un objecto de la misma clase
constructor(init?: Partial<ShoppingCartItem>){
    Object.assign(this, init); // assign( destiny, source)
}

get totalPrice(){return this.price * this.quantity;}
}
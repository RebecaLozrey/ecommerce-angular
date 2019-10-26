import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from 'shared/models/shopping-cart';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products;
  cart$: Observable<ShoppingCart>;
  filteredProducts: Product[] = [];
  category: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService, 
    private shoppingCartService: ShoppingCartService
   ) { }

    async ngOnInit(){

    this.cart$ = await this.shoppingCartService.getCart();  
    this.populateProducts();

    //ENDOFNGONINIT
    }
    
    private populateProducts(){ 

      this.productService.getAll().switchMap( products => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        (this.category)?
        this.filteredProducts = this.filterProducts(this.category):
        this.filteredProducts = this.products;

      });
    
    //ENDOFPOPULATEPRODUCTS
    }

    private filterProducts( category: string){
      if ( category ) return this.products.filter( p => p.category === category );
    }

//ENDOFPRODUCTSCOMPONENTCLASS  
}


    
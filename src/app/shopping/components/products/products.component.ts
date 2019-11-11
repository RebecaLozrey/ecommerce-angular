import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from 'shared/models/shopping-cart';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/take';
import { CategoryService } from 'shared/services/category.service';
import { FirebaseListObservable } from 'angularfire2/database';

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
  categories: any;
  catLoaded: boolean = false;
 

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService, 
    private shoppingCartService: ShoppingCartService,
    private categoriesService: CategoryService,
   ) { }

  async ngOnInit(){
      this.cart$ = await this.shoppingCartService.getCart();  
      this.populateProducts();
      this.categories = this.categoriesService.getCategories().take(1).subscribe(
        c => this.categories = c,
        err => console.log(err),
        () => {
        console.log("COMPLETE CATEGORIES RESPONSE on init");
        this.catLoaded = true;
        }
      );         
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
      if ( category && this.catLoaded)  { 
        let categoryRecord = this.categories.filter( c => c.$key.toString() === (category).toString() );
        let categoryName = categoryRecord[0].itemName.toString();
        var filteredProducts = [];
        this.products.forEach(p => {
    
            var subArray = p.categories.filter(c => c.itemName == categoryName);
            console.log(subArray);
            if( !(Array.isArray(subArray) && subArray.length === 0) ) {
              console.log(p);
              filteredProducts.push(p);
            }
        });
        console.log(filteredProducts);
          return filteredProducts;
      } else return this.products;
    }

//ENDOFPRODUCTSCOMPONENTCLASS  
}


    
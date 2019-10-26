import { Component, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from 'shared/models/product';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy{
  //download up to 10,000 records from db for a faster user experience
  //no promise, is array, 10,000 in the client
  //if its greater than 1 millon, query the db
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;
  //Data table from angular 4 data table
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) { 
    //this subscription will live if the window is open, 
    //because the user might add products from other window
    //in this case unsuscribe onDestroy
    this.subscription = this.productService.getAll()
    .subscribe(products => {
      this.filteredProducts = this.products = products;
       this.initializeTable(products); 
    });
  
}

  private initializeTable(products: Product[]){

    this.tableResource = new DataTableResource(products);

    this.tableResource.query({ offset: 0 })
    .then(items => this.items = items);

    this.tableResource.count()
    .then(count => this.itemCount = count);
  }

  reloadItems(params){
    if (!this.tableResource) return;
    this.tableResource.query(params)
    .then(items => this.items = items);
  }

  filter(query: string){
    console.log(query);
    this.filteredProducts = query ?
    this.products.filter( p => p.title.toLowerCase().includes( query.toLowerCase() ) ):
    this.products;
    this.initializeTable(this.filteredProducts);
  }

  ngOnDestroy(){
  this.subscription.unsubscribe();
  }

}

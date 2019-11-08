import 'rxjs/add/operator/take';

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { UploadFormComponent } from '../../../uploads/upload-form/upload-form.component';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  providers: [UploadFormComponent],
})
export class ProductFormComponent{

  categories$: Observable<any>; //observable array of objects in time
  product: any = {};
  id: any;
  iUrl: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService) { 
    this.categories$ = categoryService.getCategories();
    //id is an observable containing the product id
    this.id = this.route.snapshot.paramMap.get('id');
    // when the id is ready call the get method
    //take method gets one then unsuscribes
    if (this.id) this.productService.get(this.id).take(1).subscribe( p => this.product = p );
  }


  setImageUrl(event){
    console.log("from setImageField", event);
    this.product.imageUrl = event;
  }

  save(product){
    if (this.id) {
      this.productService.update(this.id, product);
      console.log('edited: ', product);
    }else {
      this.productService.create(product);
      console.log('created: ', product);
    }
    
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Are you sure you want to delete this product')) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
    
  }

}

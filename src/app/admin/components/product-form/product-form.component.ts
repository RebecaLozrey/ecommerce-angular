import 'rxjs/add/operator/take';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { UploadFormComponent } from '../../../uploads/upload-form/upload-form.component';
import { AngularMultiSelectModule } from 'angular4-multiselect-dropdown/angular4-multiselect-dropdown';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  providers: 
    [UploadFormComponent, 
      AngularMultiSelectModule,
    ]
})
export class ProductFormComponent{

  categories$: Observable<any>; //observable array of objects in time
  product: any = {};
  id: any;
  iUrl: string = "";
//multiple select field
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

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

  ngOnInit(){
    this.dropdownList = [
      {"id":1,"itemName":"Ansiedad"},
      {"id":2,"itemName":"Digestión y Nutrición"},
      {"id":3,"itemName":"Dormir Bien"},
      {"id":4,"itemName":"Estrés"},
      {"id":5,"itemName":"Cuidado de la Mente"},
      {"id":6,"itemName":"Pérdida de Peso"},
      {"id":7,"itemName":"Rejuvenecimiento"},
      {"id":8,"itemName":"Vitalidad"},
      {"id":9,"itemName":"Libido y Fertilidad"},
      {"id":10,"itemName":"Salud de la Mujer"},
    ];
    this.selectedItems = [
    //  {"id":8,"itemName":"Vitalidad"},
    ];
    this.dropdownSettings = { 
          singleSelection: false, 
          text:"Seleccionar Categorías",
          selectAllText:'Seleccionar todas',
          unSelectAllText:'Deseleccionar todas',
          enableSearchFilter: true,
          classes:"myclass custom-class"
        };
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
    if(!confirm('¿Estás seguro de que quieres borrar este producto?')) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
    
  }

// multiple select methods

onItemSelect(item:any){
  console.log(item);
  //this.selectedItems.push(item);
 // this.product.categories = this.selectedItems;
  console.log("PRODUCT CATEGORIES VALUE");
  console.log(this.product.categories);
}
OnItemDeSelect(item:any){
  console.log(item);
 // this.selectedItems.splice(item.id, 1);
 // this.product.categories = this.selectedItems;
 console.log("PRODUCT CATEGORIES VALUE");
  console.log(this.product.categories);
  // you must select at least one
}
onSelectAll(items: any){
 // this.product.categories = items;
 console.log("PRODUCT CATEGORIES VALUE");
  console.log(this.product.categories);
}
onDeSelectAll(items: any){
 // this.product.categories = items;
 console.log("PRODUCT CATEGORIES VALUE");
  console.log(this.product.categories);
}



}

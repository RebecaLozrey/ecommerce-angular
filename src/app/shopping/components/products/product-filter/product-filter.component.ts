import { Component, Input } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$: Observable<any>;
  @Input('category') category;

  constructor( private categoryService: CategoryService ) {
    this.categories$ = this.categoryService.getCategories();
   }

  

}

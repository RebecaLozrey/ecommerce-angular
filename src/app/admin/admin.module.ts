import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular-4-data-table';
import { ManageOrders } from 'app/manage-orders/manage-orders.component';
import { ViewOrder } from 'shared/components/view-order/view-order.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { UploadListComponent } from 'app/uploads/upload-list/upload-list.component';
import { UploadFormComponent } from 'app/uploads/upload-form/upload-form.component';
import { AngularMultiSelectModule } from 'angular4-multiselect-dropdown/angular4-multiselect-dropdown';


@NgModule({
  imports: [
    AngularMultiSelectModule,
    SharedModule,
    DataTableModule,
    RouterModule.forRoot([
            // admin users
      //More specific routes comme first because if not found will get to the least specific ones
      { 
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuardService] 
      },
      { 
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuardService] 
      },
      { 
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuardService] 
      },
      { 
        path: 'admin/orders',
        component: ManageOrders,
        canActivate: [AuthGuard, AdminAuthGuardService] 
      },
      { 
        path: 'admin/orders/:id',
        component: ViewOrder,
        canActivate: [AuthGuard, AdminAuthGuardService] 
      }
    ])
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ManageOrders,
    UploadListComponent,
    UploadFormComponent,
  ],
  providers: [
    AdminAuthGuardService,
  ],
})
export class AdminModule { }

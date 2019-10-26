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


@NgModule({
  imports: [
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
  ],
  providers: [
    AdminAuthGuardService,
  ],
})
export class AdminModule { }

import { OutstandingComponent } from './components/tables/outstanding/outstanding.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/tables/products/products.component';
import { OrdersComponent } from './components/tables/orders/orders.component';
import { OrderdetailsComponent } from './components/tables/orderdetails/orderdetails.component';
import { AuthGuard } from './guards/auth.guard';
import { CustomersComponent } from './components/tables/customers/customers.component';
import { MainComponent } from './components/main/main/main.component';
import { LoginComponent } from './components/common/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'customers', component: CustomersComponent, canActivate: [AuthGuard]},
  {path: 'orderdetails', component: OrderdetailsComponent, canActivate: [AuthGuard]},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  {path: 'products', component: ProductsComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'outstanding', component: OutstandingComponent, canActivate: [AuthGuard]},

  {path: 'login', component: LoginComponent},
  {path: '*', redirectTo: '', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

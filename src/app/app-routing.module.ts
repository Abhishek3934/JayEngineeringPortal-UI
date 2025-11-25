import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import { AddDimensionComponent } from './add-dimensions/add-dimensions.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin/add-product', component: AdminAddProductComponent },
  { path: 'add-dimensions', component: AddDimensionComponent },
  {path: 'manage-users', redirectTo: 'manage-users', pathMatch: 'full'}

  // add more routes later
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

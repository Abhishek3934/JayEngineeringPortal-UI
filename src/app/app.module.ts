import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import { AddDimensionComponent } from './add-dimensions/add-dimensions.component';
import { ReportComponent } from './report/report.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { AddUserComponent } from './add-user/add-user.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    AdminAddProductComponent,
    AddDimensionComponent,
    ReportComponent,
    AddUserComponent,
    SignupComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/list-comentarios/home.component';
import { PrivateComponent } from './components/ver-comentario/private.component';
import { AgregarEditarComentarioComponent } from './components/agregar-editar-comentario/admin.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//Modules
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenInterceptorService } from './services/token-interceptor.service';
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrivateComponent,
    AgregarEditarComentarioComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [AuthService,
    // JWT
    JwtHelperService,
    {provide:JWT_OPTIONS,useValue:JWT_OPTIONS},
    //TokenInterceptor
    {provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

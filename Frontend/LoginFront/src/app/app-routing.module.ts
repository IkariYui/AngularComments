import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarComentarioComponent } from './components/agregar-editar-comentario/admin.component';
import { HomeComponent } from './components/list-comentarios/home.component';
import { LoginComponent } from './components/login/login.component';
import { PrivateComponent } from './components/ver-comentario/private.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'private',component:PrivateComponent, canActivate:[AuthGuard]},
  {path:'admin',component:AgregarEditarComentarioComponent, canActivate:[RoleGuard], data:{expectedRole:'admin'} },
  {path:'login',component:LoginComponent},
  {path:'editar/:id',component:AgregarEditarComentarioComponent},
  {path:'ver/:id',component:PrivateComponent ,canActivate:[AuthGuard]},
  {path:'**', pathMatch:'full',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

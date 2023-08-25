import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TipoControlComponent } from './components/tipo-control/tipo-control.component';
import { LogueadoComponent } from './components/logueado/logueado.component';
import { LotesViewComponent } from './components/lotes-view/lotes-view.component';
import { LotesListComponent } from './components/lotes-list/lotes-list.component';
import { NewLoteComponent } from './components/new-lote/new-lote.component';
import { ArbolListComponent } from './components/arbol-list/arbol-list.component';
import { NewArbolComponent } from './components/new-arbol/new-arbol.component';
import { TipoEstacionesArbolComponent } from './components/tipo-estaciones-arbol/tipo-estaciones-arbol.component';
import { RegistroPlagaEnfermedadComponent } from './components/registro-plaga-enfermedad/registro-plaga-enfermedad.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'logueado',component:LogueadoComponent},
  {path:'recuperarPassword',component:RecoverPasswordComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'tipoControl',component:TipoControlComponent},
  {path:'lotes',component:LotesViewComponent},
  {path:'lotesLista',component:LotesListComponent},
  {path:'newLote',component:NewLoteComponent},
  {path:'listArboles',component:ArbolListComponent},
  {path:'newArbol',component:NewArbolComponent},
  {path:'tipoEstaciones',component:TipoEstacionesArbolComponent},
  {path:'controlArbol',component:RegistroPlagaEnfermedadComponent},

  {path:'**',pathMatch:'full',redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
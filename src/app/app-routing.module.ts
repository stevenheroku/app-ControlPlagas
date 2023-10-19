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
import { RolesComponent } from './components/roles/roles.component';
import { ReportControlComponent } from './components/report-control/report-control.component';
import { ViewArbolComponent } from './components/view-arbol/view-arbol.component';
import { ArbolesSiguienteComponent } from './components/arboles-siguiente/arboles-siguiente.component'; 
import { GraficoCanvasComponent } from './components/grafico-canvas/grafico-canvas.component';
import { InventarioGeneralComponent } from './components/inventario-general/inventario-general.component';
import { QuimicosRecomendadosComponent } from './components/quimicos-recomendados/quimicos-recomendados.component';
import { RevisionControlComponent } from './components/revision-control/revision-control.component';
import { MainGuard } from './guards/main.guard';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'logueado',component:LogueadoComponent},
  {path:'recuperarPassword',component:RecoverPasswordComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'tipoControl',component:TipoControlComponent,canActivate:[MainGuard]},
  {path:'lotes',component:LotesViewComponent,canActivate:[MainGuard]},
  {path:'lotesLista',component:LotesListComponent,canActivate:[MainGuard]},
  {path:'newLote/:idLote',component:NewLoteComponent,canActivate:[MainGuard]},
  {path:'listArboles/:idLote/:identificador',component:ArbolListComponent,canActivate:[MainGuard]},
  {path:'newArbol/:idLote/:identificador/:idArbol',component:NewArbolComponent,canActivate:[MainGuard]},
  {path:'tipoEstaciones',component:TipoEstacionesArbolComponent,canActivate:[MainGuard]},
  {path:'controlArbol/:idLote/:identificador/:idArbol',component:RegistroPlagaEnfermedadComponent,canActivate:[MainGuard]},
  {path:'rolesEpl',component:RolesComponent,canActivate:[MainGuard]},
  {path:'reporteControl',component:ReportControlComponent,canActivate:[MainGuard]},
  {path:'finca',component:InventarioGeneralComponent,canActivate:[MainGuard]},
  {path:'statusArbol/:idLote/:identificador/:idArbol',component:ViewArbolComponent,canActivate:[MainGuard]},
  {path:'arbolesPag/:idLote/:identificador',component:ArbolesSiguienteComponent,canActivate:[MainGuard]},
  {path:'graficas',component:GraficoCanvasComponent,canActivate:[MainGuard]},
  {path:'arbolQuimicos/:idLote/:identificador/:idArbol/:idArbolIdentificador/:fechaControl',component:QuimicosRecomendadosComponent,canActivate:[MainGuard]},
  {path:'revisionControl/:idLote/:identificador/:idArbol/:idArbolIdentificador',component:RevisionControlComponent,canActivate:[MainGuard]},

  {path:'**',pathMatch:'full',redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

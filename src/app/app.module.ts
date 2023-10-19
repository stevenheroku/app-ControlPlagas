import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http'
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

//graficas

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from './components/login/login.component';
import { RolesComponent } from './components/roles/roles.component';
import { MenuComponent } from './components/menu/menu.component';
import { LotesViewComponent } from './components/lotes-view/lotes-view.component';
import { LotesListComponent } from './components/lotes-list/lotes-list.component';
import { NewLoteComponent } from './components/new-lote/new-lote.component';
import { ArbolListComponent } from './components/arbol-list/arbol-list.component';
import { NewArbolComponent } from './components/new-arbol/new-arbol.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { AsignarRolComponent } from './components/asignar-rol/asignar-rol.component';
import { TipoControlComponent } from './components/tipo-control/tipo-control.component';
import { LogueadoComponent } from './components/logueado/logueado.component';
import { TipoEstacionesArbolComponent } from './components/tipo-estaciones-arbol/tipo-estaciones-arbol.component';
import { RegistroPlagaEnfermedadComponent } from './components/registro-plaga-enfermedad/registro-plaga-enfermedad.component';
import { AddRolComponent } from './components/add-rol/add-rol.component';
import { ReportControlComponent } from './components/report-control/report-control.component';
import { ViewArbolComponent } from './components/view-arbol/view-arbol.component';
import { ArbolesSiguienteComponent } from './components/arboles-siguiente/arboles-siguiente.component';
import { InventarioGeneralComponent } from './components/inventario-general/inventario-general.component';
import { GraficoCanvasComponent } from './components/grafico-canvas/grafico-canvas.component';
import { QuimicosRecomendadosComponent } from './components/quimicos-recomendados/quimicos-recomendados.component';
import { RevisionControlComponent } from './components/revision-control/revision-control.component';
import { NgChartsModule } from 'ng2-charts';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { DialogImgComponent } from './components/dialog-img/dialog-img.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RolesComponent,
    MenuComponent,
    LotesViewComponent,
    LotesListComponent,
    NewLoteComponent,
    ArbolListComponent,
    NewArbolComponent,
    FooterComponent,
    HeaderComponent,
    RegistrationComponent,
    RecoverPasswordComponent,
    AsignarRolComponent,
    TipoControlComponent,
    LogueadoComponent,
    TipoEstacionesArbolComponent,
    RegistroPlagaEnfermedadComponent,
    AddRolComponent,
    ReportControlComponent,
    ViewArbolComponent,
    ArbolesSiguienteComponent,
    InventarioGeneralComponent,
    GraficoCanvasComponent,
    QuimicosRecomendadosComponent,
    RevisionControlComponent,
    DialogImgComponent
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgChartsModule,
    CanvasJSAngularChartsModule,
    FormsModule, // Agrega FormsModule aquí,
    ReactiveFormsModule,
    MatDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {provide: JWT_OPTIONS,useValue:JWT_OPTIONS},
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

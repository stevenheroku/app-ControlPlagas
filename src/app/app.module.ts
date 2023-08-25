import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Agrega FormsModule aquí,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

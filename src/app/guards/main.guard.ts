import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import Swal from 'sweetalert2'
import { RespuestaLogin } from '../shared/models/Respuestas';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {
  constructor(private authService:AuthService,
              private router:Router ){

  }

  canActivate():boolean{
    //debugger;
    const storedData = localStorage.getItem('responseLogin');
    if (storedData !== null) {
      const infoToken: RespuestaLogin = JSON.parse(storedData);
     // let infoToken:RespuestaLogin =JSON.parse(localStorage.getItem('responseLogin'));
     const sesionExpirada = !this.obtenerDatosSesion();
     if(sesionExpirada)
     {
      this.router.navigate(['login'])
     }else if(!this.authService.isAuth()){
        Swal.fire({
          title: 'Error!',
          text: infoToken.data,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
        console.log('Token Invalido o ya expiro')
        this.router.navigate(['login'])
        return false
      }
    } else {
      this.router.navigate(['login'])
    }
    
    
        return true;
  }
  obtenerDatosSesion(): boolean {
    const datosSesion = localStorage.getItem('datosSesion');
    if (datosSesion) {
      const datos = JSON.parse(datosSesion);
      const tiempoExpiracion = datos.tiempoExpiracion;
      const tiempoActual = new Date().getTime();
      if (tiempoActual > tiempoExpiracion) {
        // Los datos de la sesión han expirado, eliminarlos y redirigir a la página de inicio de sesión
        localStorage.removeItem('datosSesion');
        console.log('eliminados')
        return false;
      } else {
        // Los datos de la sesión aún son válidos, devolver los datos
        return true;
      }
    } else {
      return false;
    }
  }
}

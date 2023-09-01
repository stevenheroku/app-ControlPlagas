import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  getLotes() {
    return [
      { fotoArbol: '/assets/img/logo.png', numeroArbol: 1 ,nombreEmpleado:"Jefferson Rueda",color:"amarillo"},
      { fotoArbol: '/assets/img/fenologica.png', numeroArbol: 2 ,nombreEmpleado:"Luis Gonzales",color:"verde"},
      { fotoArbol: '/assets/img/logo.png', numeroArbol: 3 ,nombreEmpleado:"Pedro Rosales",color:"verde"},
      { fotoArbol: '/assets/img/logo.png', numeroArbol: 4 ,nombreEmpleado:"Fernando Recinos",color:"rojo"},
      { fotoArbol: '/assets/img/logo.png', numeroArbol: 4 ,nombreEmpleado:"Luis Medina",color:"verde"},
      { fotoArbol: '/assets/img/logo.png', numeroArbol: 4 ,nombreEmpleado:"Jose Rueda",color:"rojo"}
      // ...otros lotes
    ];
  }
}
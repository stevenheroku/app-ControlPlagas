import { Injectable } from '@angular/core';
import { LoteModel } from '../models/LoteModel';

@Injectable({
  providedIn: 'root'
})
export class RestsService {

  obtenerLotes(): LoteModel[] {
    return [
      new LoteModel(1, 'Lote A', 'Ubicación A'),
      new LoteModel(2, 'Lote B', 'Ubicación B'),
      new LoteModel(3, 'Lote C', 'Ubicación C'),
      new LoteModel(4, 'Lote D', 'Ubicación D'),
    ];
  }
  getArboles() {
    return [
      { fotoArbol: '/assets/img/arboles.png', numeroArbol: 1 ,nombreEmpleado:"Jefferson Rueda",color:"amarillo"},
      { fotoArbol: '/assets/img/arboles.png', numeroArbol: 2 ,nombreEmpleado:"Luis Gonzales",color:"verde"},
      { fotoArbol: '/assets/img/arboles.png', numeroArbol: 3 ,nombreEmpleado:"Pedro Rosales",color:"verde"},
      { fotoArbol: '/assets/img/arboles.png', numeroArbol: 4 ,nombreEmpleado:"Fernando Recinos",color:"rojo"},
      { fotoArbol: '/assets/img/arboles.png', numeroArbol: 4 ,nombreEmpleado:"Luis Medina",color:"verde"},
      { fotoArbol: '/assets/img/arboles.png', numeroArbol: 4 ,nombreEmpleado:"Jose Rueda",color:"rojo"}
    ];
  }
  getLotes() {
    return [
      { fotoArbol: '/assets/img/lote.png', numeroArbol: 1 ,nombreEmpleado:"Jefferson Rueda"},
      { fotoArbol: '/assets/img/lote.png', numeroArbol: 2 ,nombreEmpleado:"Luis Gonzales"},
      { fotoArbol: '/assets/img/lote.png', numeroArbol: 3 ,nombreEmpleado:"Pedro Rosales"},
      { fotoArbol: '/assets/img/lote.png', numeroArbol: 4 ,nombreEmpleado:"Fernando Recinos"},
      { fotoArbol: '/assets/img/lote.png', numeroArbol: 4 ,nombreEmpleado:"Luis Medina"},
      { fotoArbol: '/assets/img/lote.png', numeroArbol: 4 ,nombreEmpleado:"Jose Rueda"}
      // ...otros lotes
    ];
  }
}
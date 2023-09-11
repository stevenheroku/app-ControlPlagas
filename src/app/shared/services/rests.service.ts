import { Injectable } from '@angular/core';
import { RespuestaLote } from '../models/Respuestas';
import { environment } from 'src/environments/enviroments.dev';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoteModel } from '../models/LoteModel';
@Injectable({
  providedIn: 'root'
})
export class RestsService {
  URL = environment.apiUrl;
  constructor(private http:HttpClient) { }

 
  //Lotes
  getLotes2(idFinca: number): Observable<RespuestaLote> {
    // Realiza una solicitud HTTP GET al API y mapea la respuesta a un array de LoteModel
    return this.http.get<RespuestaLote>(`${this.URL}lotes/lote/${idFinca}`);
  }

//FINCA
getFinca(idFinca: number): Observable<RespuestaLote> {
  // Realiza una solicitud HTTP GET al API y mapea la respuesta a un array de LoteModel
  return this.http.get<RespuestaLote>(`${this.URL}lotes/lote/${idFinca}`);
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
      { ImagenLote: '/assets/img/lote.png', IdLote: 1 ,Empleado:"Jefferson Rueda"},
      { ImagenLote: '/assets/img/lote.png', IdLote: 2 ,Empleado:"Jefferson Rueda"},
      { ImagenLote: '/assets/img/lote.png', IdLote: 3 ,Empleado:"Jefferson Rueda"}
      
      // ...otros lotes
    ];
  }
}
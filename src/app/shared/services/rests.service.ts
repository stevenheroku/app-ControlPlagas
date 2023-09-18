import { Injectable } from '@angular/core';
import { RespuestaArbol, RespuestaFinca, RespuestaLogin, RespuestaLote } from '../models/Respuestas';
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
    return this.http.get<RespuestaLote>(`${this.URL}lotes/lote/${idFinca}`);
  }
  newLote(objetoLote: LoteModel): Observable<RespuestaLote> {
    return this.http.post<RespuestaLote>(`${this.URL}lotes/newLote`,objetoLote);
  }
//FINCA
getFinca(): Observable<RespuestaFinca> {
  return this.http.get<RespuestaFinca>(`${this.URL}fincas/finca`);
}

//ARBOLES

getArboles2(idLote: number): Observable<RespuestaArbol> {
  return this.http.get<RespuestaArbol>(`${this.URL}arboles/arbol/${idLote}`);
}

getArbolDetalle(idArbol: number): Observable<RespuestaArbol> {
  return this.http.get<RespuestaArbol>(`${this.URL}arboles/arbolDetalle/${idArbol}`);
}

//USUARIOS
newUsuario(objetoUsuario: any): Observable<RespuestaLogin> {
  return this.http.post<RespuestaLogin>(`${this.URL}login/newUserEpl`,objetoUsuario);
}
updatePassUsuario(objetoUsuario: any): Observable<RespuestaLogin> {
  return this.http.put<RespuestaLogin>(`${this.URL}login/userUpdatePass`,objetoUsuario);
}

//--FIN ARBOLES
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
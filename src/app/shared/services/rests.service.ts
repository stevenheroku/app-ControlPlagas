import { Injectable } from '@angular/core';
import { RespuestaArbol, RespuestaArbolEnfermedad, RespuestaArbolPlaga, RespuestaCatalogos, RespuestaFinca, RespuestaLogin, RespuestaLote, RespuestaTipoControl } from '../models/Respuestas';
import { environment } from 'src/environments/enviroments.dev';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoteModel } from '../models/LoteModel';
import { ArbolModel } from '../models/ArbolModel';
import { TipoControlModel } from '../models/TipoControlModel';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestsService {
  URL = environment.apiUrl+"/api/";
  constructor(private http:HttpClient) { }

 
  //Lotes
  getLotes2(idFinca: number): Observable<RespuestaLote> {
    return this.http.get<RespuestaLote>(`${this.URL}lotes/lotefinca/${idFinca}`);
  }
  getLotesGrafica(idFinca: number): Observable<any> {
    return this.http.get<any>(`${this.URL}lotes/lotefincaGrafica/${idFinca}`);
  }

  getLotesReporte(idFinca: number): Observable<any> {
    return this.http.get<any>(`${this.URL}lotes/lotefincaReporte/${idFinca}`);
  }
  getLote(idLote: number): Observable<RespuestaLote> {
    return this.http.get<RespuestaLote>(`${this.URL}lotes/lote/${idLote}`);
  }
  newLote(objetoLote: LoteModel): Observable<RespuestaLote> {
    return this.http.post<RespuestaLote>(`${this.URL}lotes/newLote`,objetoLote);
  }
  deleteLote(empleado:number,idLote: number): Observable<RespuestaCatalogos> {
    return this.http.delete<RespuestaCatalogos>(`${this.URL}lotes/deletelote/${empleado}/${idLote}`);
  }
//FINCA
getFinca(): Observable<RespuestaFinca> {
  console.log("entro a obtener fincas")
  return this.http.get<RespuestaFinca>(`${this.URL}fincas/finca`);
}

getFinca3(): Observable<RespuestaFinca> {
  console.log("entro a obtener fincas")
  return this.http.post<RespuestaFinca>(`fincas/finca`,null);
}
getFinca2(): Observable<RespuestaFinca> {
  console.log("entro a obtener fincas");
  return this.http.get<RespuestaFinca>(`${this.URL}fincas/finca`)
    .pipe(
      tap(data => {
        console.log("Datos recibidos del API:", data);
      }),
      catchError(error => {
        console.error("Error al obtener datos del API:", error);
        throw error; // Propaga el error para manejarlo en el componente que llama a esta función
      })
    );
}

//ARBOLES

getArboles2(idLote: number): Observable<RespuestaArbol> {
  return this.http.get<RespuestaArbol>(`${this.URL}arboles/arbolLote/${idLote}`);
}

getArbolDetalle(idArbol: number): Observable<RespuestaArbol> {
  return this.http.get<RespuestaArbol>(`${this.URL}arboles/arbolDetalle/${idArbol}`);
}
newArbol(objetoArbol: ArbolModel): Observable<RespuestaArbol> {
  return this.http.post<RespuestaArbol>(`${this.URL}arboles/newArbol`,objetoArbol);
}
getArbol(idArbol: number): Observable<RespuestaArbol> {
  return this.http.get<RespuestaArbol>(`${this.URL}arboles/arbol/${idArbol}`);
}
getArbolPlagas(idArbol: number,fecha:string): Observable<RespuestaArbolPlaga> {
  return this.http.get<RespuestaArbolPlaga>(`${this.URL}arboles/arbolPlagas/${idArbol}/${fecha}`);
}

getArbolEnfermedades(idArbol: number,fecha:string): Observable<RespuestaArbolEnfermedad> {
  return this.http.get<RespuestaArbolEnfermedad>(`${this.URL}arboles/arbolEnfermedades/${idArbol}/${fecha}`);
}

getArbolBitacoraControl(idArbol: number): Observable<RespuestaCatalogos> {
  return this.http.get<RespuestaCatalogos>(`${this.URL}arboles/arbolControlBitacora/${idArbol}`);
}

deleteArbol(empleado:number,idArbol: number): Observable<RespuestaCatalogos> {
  return this.http.delete<RespuestaCatalogos>(`${this.URL}arboles/deleteArbol/${empleado}/${idArbol}`);
}

//USUARIOS
newUsuario(objetoUsuario: any): Observable<RespuestaLogin> {
  return this.http.post<RespuestaLogin>(`${this.URL}login/newUserEpl`,objetoUsuario);
}
updatePassUsuario(objetoUsuario: any): Observable<RespuestaLogin> {
  return this.http.put<RespuestaLogin>(`${this.URL}login/userUpdatePass`,objetoUsuario);
}

//PLAGAS Y ENFERMEDADES
getPlagas(): Observable<RespuestaCatalogos> {
  return this.http.get<RespuestaCatalogos>(`${this.URL}plagas/plaga`);
}

getEnfermedades(): Observable<RespuestaCatalogos> {
  return this.http.get<RespuestaCatalogos>(`${this.URL}enfermedades/enfermedad`);
}

//ESTACIONES
getEstaciones(): Observable<RespuestaCatalogos> {
  return this.http.get<RespuestaCatalogos>(`${this.URL}estaciones/estacion`);
}

//TIPOCONTROL
getTipoControl(): Observable<RespuestaCatalogos> {
  return this.http.get<RespuestaCatalogos>(`${this.URL}tipocontroles/tipoControl`);
}

//TIPO DE ESTRUCTURA
getTipoEstructura(): Observable<RespuestaCatalogos> {
  return this.http.get<RespuestaCatalogos>(`${this.URL}estructuras/estructura`);
}

//CONTROL ARBOL
newControl(objetoControl: TipoControlModel): Observable<RespuestaTipoControl> {
  return this.http.post<RespuestaTipoControl>(`${this.URL}arboles/newArbolControl`,objetoControl);
}
}
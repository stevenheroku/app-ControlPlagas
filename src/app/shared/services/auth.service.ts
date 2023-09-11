import { Injectable } from '@angular/core';
import { RespuestaLogin } from '../models/Respuestas';
import { environment } from 'src/environments/enviroments.dev';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoteModel } from '../models/LoteModel';
import { AuthUser } from '../models/AuthUsuario';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL = environment.apiUrl;
  constructor(private http:HttpClient) { }

  singin(user:AuthUser){
    return this.http.post<RespuestaLogin>(`${this.URL}login/user`,user)
  }

  //LOGUEADO
  logueado(IdEmpleado:Number){
    return this.http.get<RespuestaLogin>(`${this.URL}login/user/${IdEmpleado}`)
  }
}

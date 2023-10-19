import { Injectable } from '@angular/core';
import { RespuestaLogin } from '../models/Respuestas';
import { environment } from 'src/environments/enviroments.dev';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoteModel } from '../models/LoteModel';
import { AuthUsuario } from '../models/AuthUsuario';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL = environment.apiUrl+"/api/"
  istoken:string='';
  retornar:boolean=true;
  constructor(private router: Router,private http:HttpClient,
    private jwtHelper:JwtHelperService) { }

  singin(user:AuthUsuario){
    return this.http.post<RespuestaLogin>(`${this.URL}login/user`,user)
  }

  //LOGUEADO
  logueado(IdEmpleado:Number){
    return this.http.get<RespuestaLogin>(`${this.URL}login/user/${IdEmpleado}`)
  }
  isAuth(): boolean {
    const token = localStorage.getItem('token');
    const storedData = localStorage.getItem('responseLogin');
  
    if (storedData !== null && token !== null) {
      this.istoken = token;
      const infoToken: RespuestaLogin = JSON.parse(storedData);
  
      if (infoToken.state !== 200) {
        return false; // Token inválido
      }
  
      if (this.jwtHelper.isTokenExpired(this.istoken) || !localStorage.getItem('token')) {
        return false; // Token expirado o faltante
      }
  
      return true; // Usuario ha iniciado sesión correctamente
    }
  
    return false; // Datos de inicio de sesión faltantes o inválidos
  }
  logout() {
    this.router.navigate(['login']);
  }
}

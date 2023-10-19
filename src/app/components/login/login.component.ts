import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthUsuario } from 'src/app/shared/models/AuthUsuario';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MainService } from 'src/app/shared/services/main.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private usuarioJWT:any
  constructor(private router: Router,private authService:AuthService,private mainService:MainService,private jwt:JwtHelperService,) {}

  logIn(correo:string,contrasena:string){
    let usuario:AuthUsuario={
      Correo:correo,
      Pass:contrasena,
      Rol:0
    };
    console.log("datos envio:" +usuario.Correo +" "+usuario.Pass)
    if(usuario.Correo=='')
    {
      Swal.fire({
        title: 'Error!',
        text: "Ingrese su Correo" ,
        icon: 'error',
        confirmButtonText: 'Aceptar'
       }
      )
    }else  if(usuario.Pass=='')
    {
      Swal.fire({
        title: 'Error!',
        text: "Ingrese su Contraseña" ,
        icon: 'error',
        confirmButtonText: 'Aceptar'
       }
      )
    }
    else if(usuario.Correo!=='')
    {
      if(!usuario.Correo.includes("@"))
      {
        Swal.fire({
          title: 'Error!',
          text: "Ingrese un correo Válido!" ,
          icon: 'error',
          confirmButtonText: 'Aceptar'
         }
        )
      }
      else{
        this.authService.singin(usuario).subscribe(res=>{
          console.log(res)
          if(res.state==200)
          {
            const datos = {
              token: res.data,
              responseLogin: res,
              usuarioJWT: this.jwt.decodeToken(res.data),
              IdEmpleado: this.jwt.decodeToken(res.data).Empleado,
              Finca: this.jwt.decodeToken(res.data).Finca,
              Rol: this.jwt.decodeToken(res.data).NombreRol,
              NameApellido: this.jwt.decodeToken(res.data).NombreApellido,
              IdFinca: this.jwt.decodeToken(res.data).IdFinca,
            };
            this.guardarDatosSesion(datos);
            const datosSesion = localStorage.getItem('datosSesion');
            if(datosSesion!==null)
            {
              const datos2 = JSON.parse(datosSesion);
              const NameApellido = datos2.datos.NameApellido;
            }
            

          localStorage.setItem('token',res.data)
          localStorage.setItem('responseLogin',JSON.stringify(res))
          this.usuarioJWT = this.jwt.decodeToken(res.data);
          
          localStorage.setItem('IdEmpleado', JSON.stringify(this.jwt.decodeToken(res.data).Empleado));
          localStorage.setItem('Finca', JSON.stringify(this.jwt.decodeToken(res.data).Finca));
          localStorage.setItem('Rol', JSON.stringify(this.jwt.decodeToken(res.data).NombreRol));
          localStorage.setItem('NameApellido', JSON.stringify(this.jwt.decodeToken(res.data).NombreApellido));
          localStorage.setItem('IdFinca', JSON.stringify(this.jwt.decodeToken(res.data).IdFinca));
            Swal.fire({
             title: 'Bienvenido!',
             text: this.jwt.decodeToken(res.data).NombreApellido,
             icon: 'success',
             confirmButtonText: 'Aceptar'
            }
           ).then(() => {
            // Navega a la misma vista para recargarla
            this.router.navigate(['/logueado'])
          });
          }else{
            Swal.fire({
              title: 'Error!',
              text: res.data ,
              icon: 'error',
              confirmButtonText: 'Aceptar'
             }
            )
          }
         
       })
      }
    }
    else{
      
    }
    
  }
  routerRegistro() {
    this.router.navigate(['registro']);
  }
  guardarDatosSesion(datos: any) {
    const tiempoExpiracion = new Date().getTime() + 1800000; // 30 minutos de tiempo de expiración
    const datosSesion = {
      datos,
      tiempoExpiracion,
    };
    localStorage.setItem('datosSesion', JSON.stringify(datosSesion));
  }
}

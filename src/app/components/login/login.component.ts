import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthUser } from 'src/app/shared/models/AuthUsuario';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MainService } from 'src/app/shared/services/main.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router,private authService:AuthService,private mainService:MainService) {}

  logIn(correo:string,contrasena:string){
    let usuario:AuthUser={
      Correo:correo,
      Pass:contrasena
    };
    console.log("datos envio:" +usuario.Correo +" "+usuario.Pass)
    if(usuario.Correo=='' && usuario.Pass=='')
    {
      Swal.fire({
        title: 'Error!',
        text: "Ingresar correo y contraseña" ,
        icon: 'error',
        confirmButtonText: 'Aceptar'
       }
      )
    }else{
      this.authService.singin(usuario).subscribe(res=>{
        console.log(res)
        if(res.state==200)
        {
        localStorage.setItem('IdEmpleado', JSON.stringify(res.data.Empleado));
        localStorage.setItem('Finca', JSON.stringify(res.data.Finca));
        localStorage.setItem('Rol', JSON.stringify(res.data.NombreRol));
        localStorage.setItem('NameApellido', JSON.stringify(res.data.NombreApellido));

          Swal.fire({
           title: 'Bienvenido!',
           text: res.data.Nombres ,
           icon: 'success',
           confirmButtonText: 'Aceptar'
          }
         )
         this.router.navigate(['logueado'])
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
  routerRegistro() {
    this.router.navigate(['registro']);
  }
}

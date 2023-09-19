import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUsuario } from 'src/app/shared/models/AuthUsuario';
import { RestsService } from 'src/app/shared/services/rests.service';
import Swal from 'sweetalert2';
import { FormGroup,FormControl,FormArray,Validators } from '@angular/forms';
@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {
  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  constructor(private router: Router,private http: RestsService,) { }
  recuperarPass(correo:string,pass:string)
  {
    let recuperarPassUser :AuthUsuario  ={
      Correo:correo,
      Pass:pass,
      Rol:0
    };

    console.log(recuperarPassUser)
    if(correo=='' ||pass=='')
    {
      Swal.fire({
        title:'Contraseña!',
        text: 'Ingrese los campos Faltantes',
        icon:'error',
        confirmButtonText: 'Aceptar'
      })
    }else{
    this.http.updatePassUsuario(recuperarPassUser).subscribe(result=>{
      if( result.state==200){
        Swal.fire({
          title:'Contraseña!',
          text: 'La contraseña se actualizó correctamente',
          icon:'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          // Navega a la misma vista para recargarla
          this.router.navigate(['/login']);
        });

      }
      else if(result.state==404)
      {
        Swal.fire({
          title:'Contraseña!',
          text: result.data,
          icon:'error',
          confirmButtonText: 'Aceptar'
        })
      }
    });
  }
  }
}

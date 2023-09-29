import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUsuario } from 'src/app/shared/models/AuthUsuario';
import { AuthEmpleado } from 'src/app/shared/models/AuthEmpleado';
import { RestsService } from 'src/app/shared/services/rests.service';
import Swal from 'sweetalert2';
import { RespuestaFinca } from 'src/app/shared/models/Respuestas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FincaModel } from 'src/app/shared/models/FincaModel';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})


export class RegistrationComponent implements OnInit {
  
  showPassword: boolean = false;
  showPassword2: boolean = false;
  valorSexo: string = 'N'; // Variable para almacenar el valor seleccionado
  valorRol: string = '0'; // Variable para almacenar el valor seleccionado
  valorFinca: string = '0'; // Variable para almacenar el valor seleccionado
  fincas: FincaModel[] = []; // Variable para almacenar las fincas
  dpi: string = ''; // Variable para almacenar el valor del DPI
  fincas2: any[] = [];

  constructor(private router: Router,private http: RestsService) { }
  ngOnInit(): void {
    this.http.getFinca().subscribe(data => {
      const finca = data.data[0] as any;
        console.log(finca[0].Value)
        console.log(finca[0].Label)

        this.fincas = finca; // Asigna los datos a this.lotes
        // Asigna los mismos datos a filteredLotes
    });
    
  }

  crearRegistroUsuario(pNombres:string,pApellidos:string,pFechaN:string,pNumero:string,
                     pDpi:string,pDireccion:string,pCorreo:string,pPass:string)
  {
    let usuarioNew: any = {
      AuthEmpleado: {
        Nombres: pNombres,
        Apellidos: pApellidos,
        FechaNacimiento: pFechaN,
        Telefono: pNumero,
        Sexo: this.valorSexo,
        Dpi: pDpi,
        Direccion: pDireccion,
        Finca: this.valorFinca
      },
      AuthUsuario: {
        Correo: pCorreo,
        Pass: pPass,
        Rol: this.valorRol
      }
    };
    
    console.log("Registro Usuario:"+pNombres+pApellidos+pFechaN+pNumero+pDpi+pDireccion+pCorreo+pPass);
    console.log(usuarioNew.AuthEmpleado)
    if(pDpi.length>13){
      Swal.fire({
        title:'Registro Usuario',
        text: 'El dpi es incorrecto',
        icon:'error',
        confirmButtonText: 'Aceptar'
      })
    }else
    {
    this.http.newUsuario(usuarioNew).subscribe(result=>{
      if( result.data.Valor==-1){
        Swal.fire({
          title:'Registro Usuario',
          text: 'El DPI ya existe',
          icon:'error',
          confirmButtonText: 'Aceptar'
        })
      }
      else if(result.state==200){
          Swal.fire({
            title:'Registro Usuario',
            text: 'El Usuario fue registrado Correctamente',
            icon:'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            // Navega a la misma vista para recargarla
            this.router.navigate(['/login']);
          });
      }else{
        Swal.fire({
          title:'Registro Usuario',
          text: String(result.data),
          icon:'error',
          confirmButtonText: 'Aceptar'
        })
      }
    })
  }
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  togglePasswordVisibility2(): void {
    this.showPassword2 = !this.showPassword2;
  }
}

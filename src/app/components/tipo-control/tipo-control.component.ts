import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-control',
  templateUrl: './tipo-control.component.html',
  styleUrls: ['./tipo-control.component.css']
})
export class TipoControlComponent {
  router: any;

  tipoControl()
  {
    Swal.fire({
      title: '¡Fitosanitario!',
      text: "Control de Plagas y Enfermedades!" ,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    })
  }
}

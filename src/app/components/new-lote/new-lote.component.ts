import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoteModel } from 'src/app/shared/models/LoteModel';
import { RestsService } from 'src/app/shared/services/rests.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-lote',
  templateUrl: './new-lote.component.html',
  styleUrls: ['./new-lote.component.css']
})
export class NewLoteComponent implements OnInit{
  imagenSeleccionada: string | ArrayBuffer | null = null;
  IdEmpleado:number=0;
  IdFinca:number=0;
  IdLote:number=0;
  ImagenLote:string="";
  constructor(private router: Router,private http: RestsService) { }

  ngOnInit(): void {
    const empleadoID = localStorage.getItem('IdEmpleado'); // 
    const fincaId = localStorage.getItem('IdFinca'); // 
    console.log("empleado:"+empleadoID)
    console.log("finca:"+fincaId)
    if ((empleadoID!=null)&&(fincaId!=null)) {
      this.IdEmpleado=parseInt(empleadoID);
      this.IdFinca=parseInt(fincaId);
    }
  }

  crearEditarLote(pidentificador:string,phectareas:string,pnumeroArboles:string,pLongitud:string,pLatitud:string)
  {
    let lotenew:LoteModel;
    lotenew={
      IdLote:this.IdLote ,
      ArbolesControl:parseInt(pnumeroArboles),
      Empleado:this.IdEmpleado,
      Identificador:parseInt(pidentificador),
      HectareasLote:parseFloat(phectareas),
      Longitud:parseFloat(pLongitud),
      Latitud:parseFloat(pLatitud),
      ImagenLote:this.ImagenLote,
      IdFinca:this.IdFinca
    }
    console.log("LOTE NUEVO:"+lotenew);
    this.http.newLote(lotenew).subscribe(result=>{
      if(result.state==200){
          Swal.fire({
            title:'Registro Lote',
            text: 'El Lote fue registrado Correctamente',
            icon:'success',
            confirmButtonText: 'Aceptar'
          })
      }else{
        Swal.fire({
          title:'Registro Lote',
          text: String(result.data),
          icon:'error',
          confirmButtonText: 'Aceptar'
        })
      }
    })
  }
  onFileChange(event: any): void {
    
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const ImagenLotebase64 = e.target.result;
        this.ImagenLote = ImagenLotebase64;
       // console.log(this.ImagenArbol)
        this.imagenSeleccionada = e.target?.result || null; // Añadir un valor predeterminado
      };
      reader.readAsDataURL(file);
    }
  }
 
}
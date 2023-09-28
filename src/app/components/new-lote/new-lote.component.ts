import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  LoteId:number=0;
  Opcion:string="Crear Lote"
  Accion:string="El Lote fue registrado Correctamente";
  IdLote:number=0;
  ImagenLote:string="";
  LoteIdentificadorId:number=0;
  IdentificadorLote:string='';
  NombreEmpleado:string="";
  Latitud:number=0;
  Long:number=0;
  Imagenlote:string='';
  Empleado:number=0;
  FechaCreacion:string='';
  Hectareas:string='';
  ArbolesControl:string='';
NombreFinca:string="";

  constructor(private router: Router,private http: RestsService,private route: ActivatedRoute) {  }

  ngOnInit(): void {
    
      // El navegador soporta geolocalización
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Obtener ubicación exitosamente
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.Long=longitude;
            this.Latitud=latitude;
            console.log("Latitud:", latitude);
            console.log("Longitud:", longitude);
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              // El usuario denegó el permiso de geolocalización
              console.error("El usuario ha denegado el permiso de geolocalización.");
              alert("Para usar esta función, necesitamos acceder a tu ubicación. Por favor, otorga permisos de ubicación en la configuración de tu navegador.");
            } else {
              // Otro error de geolocalización
              console.error("Error al obtener la ubicación:", error.message);
            }
          }
        );
      } else {
        // El navegador no soporta geolocalización
        console.error("El navegador no soporta geolocalización");
      }
    
    
    const empleadoID = localStorage.getItem('IdEmpleado'); // 
    const fincaId = localStorage.getItem('IdFinca'); // 
    const fincaNombre = localStorage.getItem('Finca'); // 

    console.log("empleado:"+empleadoID)
    console.log("finca:"+fincaId)
    if ((empleadoID!=null)&&(fincaId!=null)&&(fincaNombre!=null)) {
      this.IdEmpleado=parseInt(empleadoID);
      this.IdFinca=parseInt(fincaId);
      this.NombreFinca=fincaNombre.replace(/"/g,'').toUpperCase();
    }
    this.route.params.subscribe(params => {
      const idLote = params['idLote'];
      const identificadorLote = params['identificador'];
      const idArbol = params['idArbol'];
      console.log("IDLOTE2_:"+idLote)
      // Ahora puedes usar el valor de "idLote" en esta vista para filtrar los árboles
     this.LoteId=idLote;
    });
    if(this.LoteId>0)
    {
      this.Opcion="Editar Lote"
      this.http.getLote(this.LoteId).subscribe(result=>{
        if(result.state==200){
          console.log(result.data)
          const lote = result.data[0] as any;
          const resultado = lote[0]; // Accedemos al primer elemento del primer arreglo
          console.log("LONG"+resultado.Longitud)
            this.LoteId = resultado.IdLote;
            this.imagenSeleccionada=resultado.IdEmpleado;
            this.IdentificadorLote = resultado.IdIdentificadorLote;
            this.FechaCreacion=resultado.FechaCreacion;
            this.Hectareas=resultado.HectareasLote;
            this.ArbolesControl=resultado.NumeroArboles;
            this.Long=resultado.Longitud;
            this.ImagenLote = resultado.ImagenLote;
            this.Latitud=resultado.Latitud;
            this.imagenSeleccionada=resultado.ImagenLote;
            this.IdFinca=resultado.IdFinca;

            this.Accion="El Lote Fue Actualizado Correctamente"
            console.log("EDIT"+this.IdentificadorLote)
        }else{
         
        }
      })
    }
  }

  crearEditarLote(pidentificador:string,phectareas:string,pnumeroArboles:string,pLongitud:string,pLatitud:string)
  {
    if (pidentificador=='' || pLongitud=='' || pLatitud=='' ||pnumeroArboles==''|| this.ImagenLote=='') {
      // Mostrar una alerta indicando que los campos son obligatorios
      console.log(pidentificador+pLongitud+pLatitud+pnumeroArboles+this.ImagenLote)
      Swal.fire({
        title: 'Campos Obligatorios',
        text: 'Por favor, complete todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return; // Detener la ejecución de la función si faltan campos
    }
    let lotenew:LoteModel;
    lotenew={
      IdLote:this.LoteId ,
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
            text: this.Accion,
            icon:'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            // Navega a la misma vista para recargarla
            this.router.navigate([`lotesLista`])
          });
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
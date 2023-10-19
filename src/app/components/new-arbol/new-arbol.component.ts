import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArbolModel } from 'src/app/shared/models/ArbolModel';
import { RestsService } from 'src/app/shared/services/rests.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-arbol',
  templateUrl: './new-arbol.component.html',
  styleUrls: ['./new-arbol.component.css']
})
export class NewArbolComponent {
  imagenSeleccionada: string | ArrayBuffer | null = null;
  EmpleadoId:number=0;
  ImagenArbol:string="";
  Opcion:string="Crear Árbol"
  Accion:string="El Árbol fue registrado Correctamente";
  LoteId:number=0;
  LoteIdentificadorId:number=0;
  IdentificadorArbol:string='';
  NombreEmpleado:string="";
  ArbolId:number=0;
  Latitud:number=0;
  Longitud:number=0;
  NombreFinca:string="";

  constructor(private router: Router,private http: RestsService,private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.inicializarUbicacion();
    const empleadoID = localStorage.getItem('IdEmpleado'); // 
    const fincaId = localStorage.getItem('IdFinca'); // 
    const nombreApellido = localStorage.getItem('NameApellido'); // 
    const fincaNombre = localStorage.getItem('Finca'); // 

    if ((empleadoID!=null)&&(nombreApellido!=null)&&(fincaNombre!=null)) {
      this.EmpleadoId=parseInt(empleadoID);
      this.NombreEmpleado=nombreApellido.replace(/"/g,'');
      this.NombreFinca=fincaNombre.replace(/"/g,'').toUpperCase();

    }
    this.route.params.subscribe(params => {
      const idLote = params['idLote'];
      const identificadorLote = params['identificador'];
      const idArbol = params['idArbol'];
      console.log("IDLOTE2_:"+idLote)
      // Ahora puedes usar el valor de "idLote" en esta vista para filtrar los árboles
     this.ArbolId = idArbol;
     this.LoteId=idLote;
     this.LoteIdentificadorId= identificadorLote;
    });
    if(this.ArbolId>0)
    {
      this.Opcion="Editar Árbol"
      this.http.getArbol(this.ArbolId).subscribe(result=>{
        if(result.state==200){
          console.log(result.data)
          const lote = result.data[0] as any;
          const resultado = lote[0]; // Accedemos al primer elemento del primer arreglo
          console.log(resultado)
            this.ImagenArbol = resultado.ImagenArbol;
            this.imagenSeleccionada=resultado.ImagenArbol;
            this.IdentificadorArbol = resultado.IdentificadorArbol;
            this.Longitud=resultado.longitud;
            this.Latitud=resultado.latitud;
            this.Accion="El Ábol Fue Actualizado Correctamente"
            console.log("EDIT"+this.IdentificadorArbol)
        }else{
         
        }
      })
    }
  }
  
  crearEditarArbol(pIdArbol:string,pidentificador:string,pLongitud:string,pLatitud:string)
  {
    if (!pIdArbol || !pidentificador || !pLongitud || !pLatitud || !this.ImagenArbol) {
      // Mostrar una alerta indicando que los campos son obligatorios
      Swal.fire({
        title: 'Campos Obligatorios',
        text: 'Por favor, complete todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return; // Detener la ejecución de la función si faltan campos
    }
    let Arbolnew:ArbolModel;
    Arbolnew={
         IdArbol: parseInt(pIdArbol),
         Empleado: this.EmpleadoId,
         IdentificadorArbol: parseInt(pidentificador),
         Longitud: parseFloat(pLongitud).toFixed(6),
         Latitud: parseFloat(pLatitud).toFixed(6),
         ImagenArbol: this.ImagenArbol,
         IdLote:this.LoteId
      
    }
    this.http.newArbol(Arbolnew).subscribe(result=>{
      if(result.state==200){
          Swal.fire({
            title:'Registro Árbol',
            text: this.Accion,
            icon:'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            // Navega a la misma vista para recargarla
            this.router.navigate([`listArboles/${this.LoteId}/${this.LoteIdentificadorId}`])
          });
      }else{
        Swal.fire({
          title:'Registro Árbol',
          text: String(result.data),
          icon:'error',
          confirmButtonText: 'Aceptar'
        })
      }
    })
  }
  navigateListaArboles() {
    // Aquí reemplaza 'nombre-de-la-vista' con el nombre de la ruta a la que deseas redirigir
    this.router.navigate([`listArboles/${this.LoteId}/${this.LoteIdentificadorId}`])
  }
  onFileChange(event: any): void {
    
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const ImagenArbolbase64 = e.target.result;
        this.ImagenArbol = ImagenArbolbase64;
       // console.log(this.ImagenArbol)
        this.imagenSeleccionada = e.target?.result || null; // Añadir un valor predeterminado
      };
      reader.readAsDataURL(file);
    }
  }

  public inicializarUbicacion() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.Latitud = position.coords.latitude;
          this.Longitud = position.coords.longitude;
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error.message);
        }
      );
    } else {
      console.error("El navegador no soporta geolocalización.");
    }
  }
  

 
}

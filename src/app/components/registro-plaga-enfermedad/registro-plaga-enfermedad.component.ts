import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogosModel } from 'src/app/shared/models/CatalogosModel';
import { TipoControlModel } from 'src/app/shared/models/TipoControlModel';
import { RestsService } from 'src/app/shared/services/rests.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-plaga-enfermedad',
  templateUrl: './registro-plaga-enfermedad.component.html',
  styleUrls: ['./registro-plaga-enfermedad.component.css']
})
export class RegistroPlagaEnfermedadComponent {
  tipoEnfermedadPlaga: number = 0; // Cambiar el tipo a número
  enfermedades: string[] = [];
  plagas: string[] = [];
  nombresEnfermedadesPlagas: string[] = [];
  nombresEstaciones: string[] = [];
  nombresTipoControl: string[] = [];
  isLoadingResults:boolean=false;
  NumeroArbol:number=0;
  NombreFinca:string="";
  IdentificadorArbol:number=0;
  IdentificadorLote:number=0;
  LoteId:number=0;
  imagenSeleccionada:string="";
  tipoControlPlagas: CatalogosModel[] = []; // Variable para almacenar las fincas
  tipoControlEnfermedades: CatalogosModel[] = []; // Variable para almacenar las fincas
  tipoEstaciones: CatalogosModel[] = []; // Variable para almacenar las fincas
  tipoControl: CatalogosModel[] = []; // Variable para almacenar las fincas
  tipoEstructura: CatalogosModel[] = []; // Variable para almacenar las fincas

  valorPlagaEnfermedad:string='';
  valorEnfermedad: string = '0';
  valorPlaga: string = '0';
  valorTipoControl: string = '0';
  valorEstacion: string = '0';
  valorEstructura: string = '0';
  CantIndividuos:number=0;
  //Label
  valorEstacionLabel: string = '';

  constructor(private router: Router, private http: RestsService,private route: ActivatedRoute) {}

  ngOnInit() {
    const fincaNombre = localStorage.getItem('Finca'); // 
    if ((fincaNombre!=null)) {
      this.NombreFinca=fincaNombre.replace(/"/g,'').toUpperCase();
    }
    this.route.params.subscribe(params => {
      const idArbol = params['idArbol'];
      const identificador = params['identificador'];
      const idLote = params['idLote'];
      const identificadorLote = params['idLote'];

    this.IdentificadorLote=identificador;
     this.NumeroArbol=idArbol;
     this.LoteId=idLote;
    });
    this.http.getArbol(this.NumeroArbol).subscribe(result=>{
      if(result.state==200){
        const lote = result.data[0] as any;
        const resultado = lote[0];
        this.IdentificadorArbol = resultado.IdentificadorArbol;
        this.imagenSeleccionada=resultado.ImagenArbol;
        this.isLoadingResults=true;
      }else{
       this.isLoadingResults=true;
      }
    })
    this.getPlagas();
    this.getEnfermedades();
    this.getEstaciones();
    this.getTipoControl();
    this.getTipoEstructura();
    
  }

  buttonCrearControl()
  {
    const opcionEstacion = this.tipoEstaciones.find(opcion => opcion.Value === parseInt(this.valorEstacion));
    const opcionTipoControl = this.tipoControl.find(opcion => opcion.Value === parseInt(this.valorTipoControl));
    const opcionPlaga= this.tipoControlPlagas.find(opcion => opcion.Value === parseInt(this.valorPlaga));
    const opcionEnfermedad = this.tipoControlPlagas.find(opcion => opcion.Value === parseInt(this.valorEnfermedad));
    const opcionEstructura = this.tipoEstructura.find(opcion => opcion.Value === parseInt(this.valorEstructura));
    console.log("Plaga:"+this.valorPlaga)
    if(parseInt(this.valorTipoControl)==1)
    {
      this.valorPlagaEnfermedad = this.valorPlaga;
    }
    else if((parseInt(this.valorTipoControl)==2))
    {
      this.valorPlagaEnfermedad = this.valorEnfermedad;
    }
    let model : TipoControlModel={
      CantidadIndividuos:this.CantIndividuos,
      TipoEstacion:parseInt(this.valorEstacion),
      TipoControl:parseInt(this.valorTipoControl),
      IdArbol:this.NumeroArbol,
      IdPlaga_Enfermedad:parseInt(this.valorPlagaEnfermedad),
      IdTipoEstructura:parseInt(this.valorEstructura)
    }
    this.valorEstacionLabel = opcionEstacion ? opcionEstacion.Label : '';
    console.log("estacion"+opcionEstacion?.Label)
    console.log("cant:"+model.CantidadIndividuos)
    console.log("tipEstacion:"+model.TipoEstacion)
    console.log("tipControl:"+model.TipoControl)
    console.log("idArbol:"+model.IdArbol)
    console.log("pla_enfer:"+model.IdPlaga_Enfermedad)
    console.log("tipEstrcu:"+model.IdTipoEstructura)

    this.crearControl(model,this.IdentificadorArbol,this.valorEstacionLabel);
  }
  
  onTipoEnfermedadPlagaChange(event: any) {
    this.tipoEnfermedadPlaga = Number(event.target.value); // Convertir a número
    if (this.tipoEnfermedadPlaga === 0) {
      this.nombresEnfermedadesPlagas = [];
    } else if (this.tipoEnfermedadPlaga === 1) {
      this.nombresEnfermedadesPlagas = this.enfermedades;
    } else if (this.tipoEnfermedadPlaga === 2) {
      this.nombresEnfermedadesPlagas = this.plagas;
    }
  }

  crearControl(objeto:TipoControlModel,identificadorArbol:number,estacion:string)
  {
    console.log("CREAR CONTROL")
    console.log(objeto.CantidadIndividuos)
    if (objeto.CantidadIndividuos<=0||objeto.IdPlaga_Enfermedad<=0||objeto.TipoControl<=0||objeto.TipoEstacion<=0) {
      // Mostrar una alerta indicando que los campos son obligatorios
      if(objeto.CantidadIndividuos<=0 )
      {
        Swal.fire({
          title: 'Cantidad de Individuos',
          text: 'Si desea ingresar un control, la cantidad de individuos debe ser mayor a 0!',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        return; 
      }else{
        Swal.fire({
          title: 'Campos Obligatorios',
          text: 'Por favor, complete todos los campos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        return; 
      }
      // Detener la ejecución de la función si faltan campos
    }
    const mensaje="Se Registro la Estación: "+estacion+" del Árbol: "+identificadorArbol;
    this.http.newControl(objeto).subscribe(result=>{
      if(result.state==200){
        Swal.fire({
          title:'Registro Control!',
          text: mensaje,
          icon:'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          // Navega a la misma vista para recargarla
          //this.router.navigate([`controlArbol/${this.LoteId}/${this.IdentificadorArbol}/${this.NumeroArbol}`])
          //window.location.reload();
          this.valorPlagaEnfermedad='0';
          this.valorEnfermedad = '0';
          this.valorPlaga = '0';
          this.valorTipoControl = '0';
          this.valorEstacion = '0';
          this.valorEstructura = '0';
          this.CantIndividuos=0;
          this.tipoEnfermedadPlaga = 0; // Cambiar el tipo a número

        });
      }else if(result.state==204){
        Swal.fire({
          title:'Registro Control!',
          text: "Error al Registrar",
          icon:'error',
          confirmButtonText: 'Aceptar'
        })
      }
    })
  }
  onTipoControlChange() {
    // Verifica si el tipo de control es "Enfermedad" (valor 2)
    if (this.valorTipoControl == "1") {
      // Restablece el valor de "tipo de enfermedad" a 0
      this.valorPlaga = "0";
      this.valorEnfermedad="0";
    }
    else{
      this.valorEnfermedad = "0";
      this.valorPlaga = "0";

    }
  }
  

   getPlagas()
  {
    this.http.getPlagas().subscribe(result=>{
      if(result.state==200){
        const plagas = result.data[0] as any;
        const resultado = plagas;
        this.tipoControlPlagas=resultado;
        console.log(this.tipoControlPlagas)
      }else{
       
      }
    })
  }

  getEnfermedades()
  {
    this.http.getEnfermedades().subscribe(result=>{
      if(result.state==200){
        const enfermedades = result.data[0] as any;
        const resultado = enfermedades;
        this.tipoControlEnfermedades=resultado;
        console.log(this.tipoControlEnfermedades)

      }else{
       
      }
    })
  }
  getEstaciones()
  {
    this.http.getEstaciones().subscribe(result=>{
      if(result.state==200){
        const Estaciones = result.data[0] as any;
        const resultado = Estaciones;
        this.tipoEstaciones=resultado;
        console.log(this.tipoEstaciones)

      }else{
       
      }
    })
  }
  getTipoControl()
  {
    this.http.getTipoControl().subscribe(result=>{
      if(result.state==200){
        const tipoControl = result.data[0] as any;
        const resultado = tipoControl;
        this.tipoControl=resultado;
        console.log(this.tipoControl)

      }else{
       
      }
    })
  }

  getTipoEstructura()
  {
    this.http.getTipoEstructura().subscribe(result=>{
      if(result.state==200){
        const tipoEstructura= result.data[0] as any;
        const resultado = tipoEstructura;
        this.tipoEstructura=resultado;
        console.log(this.tipoEstructura)

      }else{
       
      }
    })
  }

  navigateListaArboles() {
    // Aquí reemplaza 'nombre-de-la-vista' con el nombre de la ruta a la que deseas redirigir
    this.router.navigate([`listArboles/${this.LoteId}/${this.IdentificadorLote}`])
  }
}

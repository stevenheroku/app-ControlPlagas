import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestsService } from 'src/app/shared/services/rests.service';

@Component({
  selector: 'app-revision-control',
  templateUrl: './revision-control.component.html',
  styleUrls: ['./revision-control.component.css']
})
export class RevisionControlComponent {

  LoteId:number=0;
  LoteIdentificadorId:number=0;
  IdentificadorArbol:number=0;
  ArbolId:number=0;
  InvetarioArbol:any[]=[];
  NombreFinca:string='';
  listaFechasControles = ["01-09-2023", "15-09-2023", /* Otras fechas */];
  constructor(private router: Router,private http: RestsService,private route: ActivatedRoute) { }
  ngOnInit(): void {
     

    const fincaNombre = localStorage.getItem('Finca'); // 
    if ((fincaNombre!=null)) {
      this.NombreFinca=fincaNombre.replace(/"/g,'').toUpperCase();
    }
    this.route.params.subscribe(params => {
      const idLote = params['idLote'];
      const identificadorLote = params['identificador'];
      const idArbol = params['idArbol'];
      const idArbolIdentificador = params['idArbolIdentificador'];
      this.ArbolId=idArbol;
      console.log("IDLOTE2_:"+idLote)
      // Ahora puedes usar el valor de "idLote" en esta vista para filtrar los árboles
     this.LoteId=idLote;
     this.LoteIdentificadorId= identificadorLote;
     this.IdentificadorArbol=idArbolIdentificador;
    });

    this.getInventario();
    
  }

  getInventario()
  {
    this.http.getArbolBitacoraControl(this.ArbolId).subscribe(result=>{
      if(result.state==200){
        const inventarioArbol = result.data[0] as any;
        const resultado = inventarioArbol;
        this.InvetarioArbol =resultado;
        console.log(this.InvetarioArbol)
      }else{
       
      }
    })
  }
  navegarAPlagas(fechaControl: string) {
    // Aquí puedes navegar a la vista que muestra las plagas y enfermedades
    // Pasando la fecha como parámetro si es necesario
    console.log("fecha:"+fechaControl)
    this.router.navigate([`arbolQuimicos/${this.LoteId}/${this.LoteIdentificadorId}/${this.ArbolId}/${this.IdentificadorArbol}/${fechaControl}`])
  }

  navigateListaArboles() {
    // Aquí reemplaza 'nombre-de-la-vista' con el nombre de la ruta a la que deseas redirigir
    this.router.navigate([`listArboles/${this.LoteId}/${this.LoteIdentificadorId}`])
  } 
  

}

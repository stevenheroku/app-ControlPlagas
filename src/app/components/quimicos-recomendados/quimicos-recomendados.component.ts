import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArbolEnfermedadModel } from 'src/app/shared/models/ArbolEnfermedadModel';
import { ArbolPlagaModel } from 'src/app/shared/models/ArbolPlagaModel';
import { RestsService } from 'src/app/shared/services/rests.service';

@Component({
  selector: 'app-quimicos-recomendados',
  templateUrl: './quimicos-recomendados.component.html',
  styleUrls: ['./quimicos-recomendados.component.css']
})
export class QuimicosRecomendadosComponent {
  LoteId:number=0;
  LoteIdentificadorId:number=0;
  ArbolId:number=0;
  ArbolesPlaga:any[]=[];
  ArbolesEnfermedad:any[]=[];
  NombreFinca:string='';
  lotes = [
    { id: 1, nombre: 'Lote 1', finca: 'Finca A', area: 100 },
    { id: 2, nombre: 'Lote 2', finca: 'Finca B', area: 150 },
    { id: 3, nombre: 'Lote 3', finca: 'Finca A', area: 120 },
    // ... más datos de lotes
  ];
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
      this.ArbolId=idArbol;
      console.log("IDLOTE2_:"+idLote)
      // Ahora puedes usar el valor de "idLote" en esta vista para filtrar los árboles
     this.LoteId=idLote;
     this.LoteIdentificadorId= identificadorLote;
    });
    this.getPlagasArbol();
    this.getEnfermedadesArbol();
  }
  navigateListaArboles() {
    // Aquí reemplaza 'nombre-de-la-vista' con el nombre de la ruta a la que deseas redirigir
    this.router.navigate([`listArboles/${this.LoteId}/${this.LoteIdentificadorId}`])
  }

  getPlagasArbol()
  {
    this.http.getArbolPlagas(this.ArbolId).subscribe(result=>{
      if(result.state==200){
        const plagas = result.data[0] as any;
        const resultado = plagas;
        this.ArbolesPlaga =resultado;
        console.log(this.ArbolesPlaga)
      }else{
       
      }
    })
  }

  getEnfermedadesArbol()
  {
    this.http.getArbolEnfermedades(this.ArbolId).subscribe(result=>{
      if(result.state==200){
        const enfermedadesArbol = result.data[0] as any;
        const resultado = enfermedadesArbol;
        this.ArbolesEnfermedad = resultado;
      }else{
       
      }
    })
  }
}

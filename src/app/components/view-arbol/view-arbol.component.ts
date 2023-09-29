import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestsService } from '../../shared/services/rests.service';

@Component({
  selector: 'app-view-arbol',
  templateUrl: './view-arbol.component.html',
  styleUrls: ['./view-arbol.component.css']
})
export class ViewArbolComponent {
  searchTerm: string = '';
  filteredArbol: any[] = [];
  LoteId:number=0;
  LoteIdentificadorId:number=0;
  NumeroArbol:number=0;
  NombreFinca:string="";
  isLoadingResults:boolean=false;
  constructor(private router: Router,private http: RestsService,private route: ActivatedRoute) {}
  lotes = [
    { id: 1, cantEnfemedades: 'Lote 1', cantPlagas: 'Finca A', identificador: "rojo" },
  ];



  ngOnInit() {
    const fincaNombre = localStorage.getItem('Finca'); //
    if(fincaNombre!=null)
    {
      this.NombreFinca=fincaNombre.replace(/"/g,'');
      this.NombreFinca = this.NombreFinca.toUpperCase();
    }
    this.route.params.subscribe(params => {
      const idLote = params['idLote'];
      const identificadorLote = params['identificador'];
      const idArbol = params['idArbol'];
      console.log("IDLOTE2_:"+idLote)
      // Ahora puedes usar el valor de "idLote" en esta vista para filtrar los árboles
     this.LoteId=idLote;
     this.NumeroArbol=idArbol;
     this.LoteIdentificadorId= identificadorLote;
     console.log('IMPRIMIR_IDAEBOL_'+this.NumeroArbol)
    });
    this.http.getArbolDetalle(this.NumeroArbol).subscribe(data => {
      if (data.state === 200) {
        const lote = data.data[0] as any;
        this.lotes = [lote]; // Asigna los datos a this.lotes
        // Asigna los mismos datos a filteredLotes
        console.log(this.lotes);
        this.isLoadingResults=true;
        this.filteredArbol=lote;
        console.log(this.filteredArbol);
      } else {
        this.isLoadingResults=true;

      }
    });
    
    this.filteredArbol = this.lotes; // Inicializa los lotes filtrados al inicio
  }

  searchLotes() {
    this.filteredArbol = this.lotes.filter(
      (lote) => lote.id.toString().includes(this.searchTerm)
    );
  }

  navigateToOtherView() {
    // Aquí reemplaza 'nombre-de-la-vista' con el nombre de la ruta a la que deseas redirigir
    this.router.navigate([`listArboles/${this.LoteId}/${this.LoteIdentificadorId}`])
  }
}
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestsService } from '../../shared/services/rests.service';
import { LoteModel } from 'src/app/shared/models/LoteModel';
import { ArbolModel } from 'src/app/shared/models/ArbolModel';

@Component({
  selector: 'app-arbol-list',
  templateUrl: './arbol-list.component.html',
  styleUrls: ['./arbol-list.component.css']
})

export class ArbolListComponent {
  arboles: ArbolModel[] = [];
  responseData: ArbolModel[] = [];
  resultsLength = 0;
  searchTerm: string = '';
  filteredLotes: any[] = [];
  isLoadingResults = true;
  LoteId:Number=0;
  LoteIdentificadorId:Number=0;
  constructor(private router: Router, private http: RestsService,private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const idLote = params['idLote'];
      const identificadorLote = params['identificador'];
      console.log("IDLOTE2_:"+idLote)
      // Ahora puedes usar el valor de "idLote" en esta vista para filtrar los árboles
     this.LoteId=idLote;
     this.LoteIdentificadorId= identificadorLote;
    });
    this.http.getArboles2(Number(this.LoteId)).subscribe(data => {
      if (data.state === 200) {
        const lote = data.data[0] as any;
        console.log(this.http.getLotes())
        this.arboles = [lote]; // Asigna los datos a this.lotes
        // Asigna los mismos datos a filteredLotes
        console.log(this.arboles);
        this.filteredLotes=lote;
        console.log(this.filteredLotes);
      } else {
        this.isLoadingResults = false;
      }
    });
    this.filteredLotes = this.arboles; // Inicializa los lotes filtrados al inicio
  }

  searchLotes() {
    this.filteredLotes = this.arboles.filter(
      (arboles) => arboles.IdArbol.toString().includes(this.searchTerm)
    );
  }

  navigateListaArboles() {
    // Aquí reemplaza 'nombre-de-la-vista' con el nombre de la ruta a la que deseas redirigir
    this.router.navigate([`listArboles/${this.LoteId}/${this.LoteIdentificadorId}`])
  }

  viewStatusArbol(idArbol:number)
  {
    console.log("IDARBOL_:"+idArbol)
    this.router.navigate([`statusArbol/${this.LoteId}/${this.LoteIdentificadorId}/${idArbol}`])

  }
  
}

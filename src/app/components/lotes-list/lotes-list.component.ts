import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoteModel } from '../../shared/models/LoteModel';
import { RestsService } from '../../shared/services/rests.service'
import { MainService } from '../../shared/services/main.service';
@Component({
  selector: 'app-lotes-list',
  templateUrl: './lotes-list.component.html',
  styleUrls: ['./lotes-list.component.css']
})
export class LotesListComponent {
  lotes: LoteModel[] = [];
  responseData: LoteModel[] = [];
  resultsLength = 0;
  searchTerm: string = '';
  filteredLotes: any[] = [];
  isLoadingResults = true;

  //variables globales
  NombreFinca:string="";
  constructor(private router: Router,private http: RestsService) { }

  ngOnInit() :void{
    const IdFinca = localStorage.getItem('IdFinca'); // 
    const fincaNombre = localStorage.getItem('Finca'); //
    if(fincaNombre!=null)
    {
      this.NombreFinca=fincaNombre.replace(/"/g,'');
      this.NombreFinca = this.NombreFinca.toUpperCase();
    } 
    this.http.getLotes2(Number(IdFinca)).subscribe(data => {
      if (data.state === 200) {
        const lote = data.data[0] as any;
        console.log(this.http.getLotes())
        this.lotes = [lote]; // Asigna los datos a this.lotes
        // Asigna los mismos datos a filteredLotes
        console.log(this.lotes);
        this.filteredLotes=lote;
        console.log(this.filteredLotes);
      } else {
        this.isLoadingResults = false;
      }
    });
  }
  searchLotes() {
    this.filteredLotes = this.lotes.filter(
      (lote) => lote.Identificador.toString().includes(this.searchTerm)
      );
      this.filteredLotes = this.lotes;
  }

  filtrarArbolesPorLote(idLote: number,identificador:number) {
    // Luego, navega a la vista "arbolesPag" y pasa el parámetro "idLote" como query parameter
    console.log("vistalot:"+idLote+"_"+identificador)
    //this.router.navigate(['arbolesPag/'], { queryParams: { idLote } });
    this.router.navigate([`arbolesPag/${idLote}/${identificador}`])

  }


}
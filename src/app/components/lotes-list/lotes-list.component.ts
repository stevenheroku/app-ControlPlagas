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

  ngOnInit() {
    
    this.http.getLotes2(1).subscribe(data => {
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
    /*this.filteredLotes = this.lotes.filter(
      (lote) => lote.IdLote.toString().includes(this.searchTerm)
      );*/
      this.filteredLotes = this.lotes;
  }

  navigateToOtherView() {
    this.router.navigate(['listArboles']);
  }
 


}
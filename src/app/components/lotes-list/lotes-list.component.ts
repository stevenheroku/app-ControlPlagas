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
  lotes: any[] = [];
  searchTerm: string = '';
  filteredLotes: any[] = [];

  constructor(private router: Router,private loteService: RestsService) {}
  ngOnInit() {
    this.lotes = this.loteService.getLotes();
    this.filteredLotes = this.lotes; // Inicializa los lotes filtrados al inicio
  }
  searchLotes() {
    this.filteredLotes = this.lotes.filter(
      (lote) => lote.numeroArbol.toString().includes(this.searchTerm)
    );
  }

  navigateToOtherView() {
    this.router.navigate(['listArboles']);
  }
 


}
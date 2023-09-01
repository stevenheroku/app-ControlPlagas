import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestsService } from '../../shared/services/rests.service';

@Component({
  selector: 'app-arbol-list',
  templateUrl: './arbol-list.component.html',
  styleUrls: ['./arbol-list.component.css']
})

export class ArbolListComponent {
  lotes: any[] = [];
  searchTerm: string = '';
  filteredLotes: any[] = [];

  constructor(private router: Router, private loteService: RestsService) {}

  ngOnInit() {
    this.lotes = this.loteService.getArboles();
    this.filteredLotes = this.lotes; // Inicializa los lotes filtrados al inicio
  }

  searchLotes() {
    this.filteredLotes = this.lotes.filter(
      (lote) => lote.numeroArbol.toString().includes(this.searchTerm)
    );
  }

  navigateToOtherView() {
    // Aquí reemplaza 'nombre-de-la-vista' con el nombre de la ruta a la que deseas redirigir
    this.router.navigate(['listArboles']);
  }
  
}

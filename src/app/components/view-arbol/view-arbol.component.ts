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
  filteredLotes: any[] = [];
  constructor(private router: Router,private loteService: RestsService) {}
  lotes = [
    { id: 1, cantEnfemedades: 'Lote 1', cantPlagas: 'Finca A', identificador: "rojo" },
  ];



  ngOnInit() {
    this.filteredLotes = this.lotes; // Inicializa los lotes filtrados al inicio
  }

  searchLotes() {
    this.filteredLotes = this.lotes.filter(
      (lote) => lote.id.toString().includes(this.searchTerm)
    );
  }

  navigateToOtherView() {
    // Aquí reemplaza 'nombre-de-la-vista' con el nombre de la ruta a la que deseas redirigir
    this.router.navigate(['listArboles']);
  }
}
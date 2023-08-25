import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lotes-list',
  templateUrl: './lotes-list.component.html',
  styleUrls: ['./lotes-list.component.css']
})
export class LotesListComponent {
  constructor(private router: Router) {}
  lotes = [
    { id: 1, nombre: 'Lote 1', finca: 'Finca A', area: 100 },
    { id: 2, nombre: 'Lote 2', finca: 'Finca B', area: 150 },
    { id: 3, nombre: 'Lote 3', finca: 'Finca A', area: 120 },
    // ... más datos de lotes
  ];

  editarLote(lote: any) {
    // Implementa la lógica para editar el lote aquí
    console.log('Editar lote:', lote);
  }

  eliminarLote(lote: any) {
    // Implementa la lógica para eliminar el lote aquí
    console.log('Eliminar lote:', lote);
  }

  navigateToOtherView() {
    // Aquí reemplaza 'nombre-de-la-vista' con el nombre de la ruta a la que deseas redirigir
    this.router.navigate(['listArboles']);
  }
}
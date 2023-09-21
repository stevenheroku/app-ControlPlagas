import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare let html2pdf: any;
@Component({
  selector: 'app-report-control',
  templateUrl: './report-control.component.html',
  styleUrls: ['./report-control.component.css'],
})
export class ReportControlComponent {
  searchTerm: string = '';
  filteredLotes: any[] = [];
  NombreFinca:string='';
  constructor(private router: Router) {}
  lotes = [
    { id: 1, cantEnfemedades: 'Lote 1', cantPlagas: 'Finca A', identificador: "rojo" },
  ];



  ngOnInit() {
    const fincaNombre = localStorage.getItem('Finca'); // 
    if ((fincaNombre!=null)) {
      this.NombreFinca=fincaNombre.replace(/"/g,'').toUpperCase();
    }
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




import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/shared/services/main.service';
import { RestsService } from 'src/app/shared/services/rests.service';

declare let html2pdf: any;
@Component({
  selector: 'app-report-control',
  templateUrl: './report-control.component.html',
  styleUrls: ['./report-control.component.css'],
})
export class ReportControlComponent {
  searchTerm: string = '';
  filteredLotes: any[] = [];
  NombreFinca: string = '';
  FincaId: number = 0;
  isLoadingResults = false;
  DataReport:any[]=[];

  constructor(
    private router: Router,
    private http: RestsService,
    private mainService: MainService,
  ) {}
  lotes = [
    { id: 1, cantEnfemedades: 'Lote 1', cantPlagas: 'Finca A', identificador: "rojo" },
  ];



  ngOnInit() {
    const fincaNombre = localStorage.getItem('Finca'); // 
    const IdFinca = localStorage.getItem('IdFinca'); //

    if ((fincaNombre!=null)&& IdFinca != null) {
      this.NombreFinca=fincaNombre.replace(/"/g,'').toUpperCase();
      this.FincaId = parseInt(IdFinca);
    }
    this.http.getLotesReporte(Number(this.FincaId)).subscribe((data) => {
      console.log('Primero');
      if (data.state === 200) {
        const lote = data.data[0] as any;
        // Asigna los mismos datos a filteredLotes
        this.DataReport = lote;
        this.isLoadingResults=true;
      } else {
        this.isLoadingResults = true;
      }
    });
  }

  navigateToOtherView() {
    // Aquí reemplaza 'nombre-de-la-vista' con el nombre de la ruta a la que deseas redirigir
    this.router.navigate(['listArboles']);
  }
}




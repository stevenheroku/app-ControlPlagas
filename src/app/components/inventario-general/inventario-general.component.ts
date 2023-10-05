import {
  Component,
  AfterViewInit,
  OnChanges,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef 
} from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MainService } from 'src/app/shared/services/main.service';
import { RestsService } from 'src/app/shared/services/rests.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
declare let html2pdf: any;
declare var CanvasJS: any;
@Component({
  selector: 'app-inventario-general',
  templateUrl: './inventario-general.component.html',
  styleUrls: ['./inventario-general.component.css'],
})
export class InventarioGeneralComponent {
  constructor(
    private router: Router,
    private http: RestsService,
    private mainService: MainService,
    private cdr: ChangeDetectorRef
  ) {}
  responseData: any[] = [];
  resultsLength = 0;
  searchTerm: string = '';
  filteredLotes: any[] = [];
  isLoadingResults = true;
  LoteId: Number = 0;
  NombreFinca: string = '';
  FincaId: number = 0;
  lotes2: any[] = [];
  bandera:number=0;
  lotes:any[]=[];
  chartOptions: any = {};
  barChartData: any[] = [];
  barChartLabels: string[] = [];
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true, // Apilar barras horizontalmente (por fecha)
      },
      y: {
        stacked: true, // Apilar barras verticalmente (por lote)
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Árboles: ${context.raw}`;
          },
        },
      },
    },
  };
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  ngOnInit(): void {
    const IdFinca = localStorage.getItem('IdFinca'); //
    const fincaNombre = localStorage.getItem('Finca'); //

    if (fincaNombre != null && IdFinca != null) {
      this.NombreFinca = fincaNombre.replace(/"/g, '').toUpperCase();
      this.FincaId = parseInt(IdFinca);
    }
    this.lotesGrafica3();
     
  }
  public lotesGrafica3() {
    this.http.getLotesGrafica(Number(1)).subscribe((data) => {
      console.log(data.state);
      if (data.state === 200) {
        const lote = data.data[0] as any;
        // Asigna los mismos datos a filteredLotes
        this.filteredLotes = lote;
        console.log(this.filteredLotes);
        
        // Llamar a la función grafica para configurar y renderizar el gráfico
        this.updateChartTitle(this.filteredLotes);
        
      } else {
        this.isLoadingResults = false;
      }
    });
  }

  updateChartTitle(dataLotes: any[]) {
    console.log("entro funcion")
    this.chartOptions = {
      title: {
        text: "Árboles por Lote",
      },
      data: [{
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>Lote->{label}</b>: {y} Árboles",
        showInLegend: "true",
        legendText: "{label2}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y} Árboles",
        dataPoints: dataLotes.map((item: { Label: any; Arboles: any; Label2: any; }) => ({
          label: item.Label2,
          y: item.Arboles,
          label2: item.Label
        }))
      }]               
    };
  }
  private getDataFromDatabase(): Observable<any> {
    return this.http.getLotesGrafica(Number(this.FincaId));
  }
  // Función para generar un color aleatorio en formato RGBA
  private getRandomColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const alpha = 0.5; // Opacidad del color (0.5 = 50% opacidad)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}

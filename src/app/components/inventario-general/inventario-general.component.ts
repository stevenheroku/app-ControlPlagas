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
    /*this.lotes = [
      { IdIdentificadorLote: 1892, FechaCreacion: '2023-09-17', Arboles: 2 },
      { IdIdentificadorLote: 2321, FechaCreacion: '2023-09-17', Arboles: 1 },
      { IdIdentificadorLote: 8393, FechaCreacion: '2023-09-18', Arboles: 4 },
      { IdIdentificadorLote: 4142, FechaCreacion: '2023-09-19', Arboles: 3 },
      { IdIdentificadorLote: 4222, FechaCreacion: '2023-09-19', Arboles: 3 },
      { IdIdentificadorLote: 4554, FechaCreacion: '2023-09-19', Arboles: 3 },
    ];*/
    
    this.lotesGrafica4()
    .then((lotes) => {
      console.log("entro a grafica");
      this.barChartData.reverse();
      this.grafica(lotes);
    })
    .catch((error) => {
      console.error('Error en lotesGrafica3', error);
    });
      this.lotesGrafica4();
     
  }
  public  lotesGrafica() {
    this.http.getLotesGrafica(Number(this.FincaId)).subscribe((data) => {
      console.log('Primero');
      if (data.state === 200) {
        const lote = data.data[0] as any;
        this.lotes2 = [lote]; // Asigna los datos a this.lotes
        // Asigna los mismos datos a filteredLotes
        console.log(this.lotes2);
        this.filteredLotes = lote;
        console.log(this.filteredLotes)
      } else {
        this.isLoadingResults = false;
      }
    });
  }

  public lotesGrafica3() {
    this.http.getLotesGrafica(Number(this.FincaId)).subscribe((data) => {
      console.log('Primero');
      if (data.state === 200) {
        const lote = data.data[0] as any;
        this.lotes2 = [lote]; // Asigna los datos a this.lotes
        // Asigna los mismos datos a filteredLotes
        console.log(this.lotes2);
        this.filteredLotes = lote;
        console.log(this.filteredLotes);
        
        // Realizar otras acciones aquí, después de obtener los datos
        this.grafica(this.filteredLotes);
        this.barChartData.reverse();
      } else {
        this.isLoadingResults = false;
      }
    });
  }

  public grafica(lotesParam: any[]) {
    console.log('graficas');
    const lotesPorFecha = new Map<string, Map<string, number>>();
    lotesParam.forEach((lote) => {
      const fecha = lote.FechaCreacion;
      const loteId = lote.IdIdentificadorLote.toString(); // Convertir a cadena
      const arboles = lote.Arboles;
      console.log(fecha+loteId+arboles)
      if (!lotesPorFecha.has(fecha)) {
        lotesPorFecha.set(fecha, new Map<string, number>());
        this.barChartLabels.push(fecha); // Agregar la fecha al arreglo de etiquetas
      }
      const lotesEnFecha = lotesPorFecha.get(fecha)!;
      if (!lotesEnFecha.has(loteId)) {
        lotesEnFecha.set(loteId, 0);
      }
      lotesEnFecha.set(loteId, lotesEnFecha.get(loteId)! + arboles);
    });

    // Crear arreglos para datos del gráfico
    const loteIds = Array.from(
      new Set(lotesParam.map((lote) => lote.IdIdentificadorLote.toString()))
    );
    console.log("arreglo lotes")
    loteIds.forEach((loteId) => {
      const dataPorLote = this.barChartLabels.map((fecha) => {
        return lotesPorFecha.get(fecha)?.get(loteId) || 0;
      });
      this.barChartData.push({
        data: dataPorLote,
        label: `Lote ${loteId}`,
        backgroundColor: this.getRandomColor(),
      });
    });
  }

  public async lotesGrafica2() {
    return new Promise<any[]>((resolve, reject) => {
      this.http.getLotesGrafica(Number(this.FincaId)).subscribe(
        (data) => {
          console.log('Primero');
          if (data.state === 200) {
            const lote = data.data[0] as any;
            this.lotes2 = [lote]; // Asigna los datos a lotes
            console.log(this.lotes2);
            this.filteredLotes = lote;
            
            resolve(lote); // Resuelve la promesa con el arreglo de lotes
            console.log(this.filteredLotes)
            
          } else {
            this.isLoadingResults = false;
            reject('Error en la solicitud HTTP');
          }
        },
        (error) => {
          console.error('Error en la solicitud HTTP', error);
          reject('Error en la solicitud HTTP');
        }
      );
    });
  }

  public lotesGrafica4(): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      this.http.getLotesGrafica(Number(this.FincaId)).subscribe(
        (data) => {
          console.log('Primero');
          if (data.state === 200) {
            const lote = data.data[0] as any;
            this.lotes2 = [lote]; // Asigna los datos a this.lotes
            // Asigna los mismos datos a filteredLotes
            console.log(this.lotes2);
            this.filteredLotes = lote;
            console.log(this.filteredLotes);
  
            // Realizar otras acciones aquí, después de obtener los datos
            resolve(this.filteredLotes);
          } else {
            this.isLoadingResults = false;
            reject('Error en la solicitud HTTP');
          }
        },
        (error) => {
          console.error('Error en la solicitud HTTP', error);
          reject('Error en la solicitud HTTP');
        }
      );
    });
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

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/shared/services/main.service';
import { RestsService } from 'src/app/shared/services/rests.service';

declare var CanvasJS: any;

@Component({
  selector: 'app-grafico-canvas',
  templateUrl: './grafico-canvas.component.html',
  styleUrls: ['./grafico-canvas.component.css']
})
export class GraficoCanvasComponent implements OnInit {

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
  dataGrafica:any=[
    {
        "Label2": 3232,
        "Label": "27/09/2023",
        "Arboles": 1
    },
    {
        "Label2": 33893,
        "Label": "27/09/2023",
        "Arboles": 0
    }
]
chartOptions: any = {};


  ngOnInit(): void {
    this.lotesGrafica3();
  }
  public lotesGrafica3() {
    this.http.getLotesGrafica(Number(1)).subscribe((data) => {
      console.log(data.state);
      if (data.state === 200) {
        const lote = data.data[0] as any;
        this.lotes2 = [lote]; // Asigna los datos a this.lotes
        // Asigna los mismos datos a filteredLotes
        console.log(this.lotes2);
        this.filteredLotes = lote;
        console.log(this.filteredLotes);
        
        // Llamar a la función grafica para configurar y renderizar el gráfico
        this.updateChartTitle("this.filteredLotes",this.filteredLotes);
        
      } else {
        this.isLoadingResults = false;
      }
    });
  }

  updateChartTitle(titleText: string,dataLotes: any[]) {
    console.log("entro funcion")
    this.chartOptions = {
      title: {
        text: titleText,
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
}

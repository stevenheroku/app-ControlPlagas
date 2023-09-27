import { Component, AfterViewInit, OnChanges, OnDestroy, Input, Output ,EventEmitter } from '@angular/core';
/*import * as CanvasJS from 'canvasjs';
 declare var require: any;*/
 
 @Component({
  selector: 'app-grafico-canvas',
  templateUrl: './grafico-canvas.component.html',
  styleUrls: ['./grafico-canvas.component.css']
 })
 
 export  class GraficoCanvasComponent {
  title = 'chartAngular';

  chartData = [
    {
      data: [330, 600, 260, 700,567,345],
      label: 'Samsung'
    },
    {
      data: [120, 455, 100, 340,678,567],
      label: 'Apple'
    },
    {
      data: [45, 67, 800, 500,980,456],
      label: 'Xiaomi'
    }
  ];

  chartLabels = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
  ];

  chartOptions = {
    responsive: true
  };
  chartType = 'doughnut'; // Puedes cambiarlo a 'pie' para un gráfico de tarta
  chartLegend = true; 
}
 

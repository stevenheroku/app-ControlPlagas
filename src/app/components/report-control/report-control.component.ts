import { Component } from '@angular/core';

declare let html2pdf: any;
@Component({
  selector: 'app-report-control',
  templateUrl: './report-control.component.html',
  styleUrls: ['./report-control.component.css'],
})
export class ReportControlComponent {

  totalDiaIngresan = 10; // Coloca tus valores reales aquí
  totalDiaAyer = 15;
  totalMes = 200;
  totalPlagas = 50;
  totalEnfermedades = 30;

  generarPDF() {
    const doc = new html2pdf();
    doc.text('Reporte por Finca', 10, 10);
    doc.text(`Total del día en que ingresan: ${this.totalDiaIngresan}`, 10, 20);
    doc.text(`Total del día de ayer: ${this.totalDiaAyer}`, 10, 30);
    doc.text(`Total del Mes: ${this.totalMes}`, 10, 40);
    doc.text(`Total de plagas encontradas: ${this.totalPlagas}`, 10, 50);
    doc.text(`Total de enfermedades encontradas: ${this.totalEnfermedades}`, 10, 60);
    doc.save('reporte_fincas.pdf');
  }
  chartData = [30, 20, 50];
  chartLabels = ['Bastantes', 'Medio', 'Nada'];
  chartOptions = {
    legend: {
      display: true,
      position: 'bottom'
    },
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  };
  
  ngOnInit() {
    // Inicializar el gráfico aquí si es necesario
  }
  
}






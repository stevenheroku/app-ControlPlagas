import { Component } from '@angular/core';

@Component({
  selector: 'app-registro-plaga-enfermedad',
  templateUrl: './registro-plaga-enfermedad.component.html',
  styleUrls: ['./registro-plaga-enfermedad.component.css']
})
export class RegistroPlagaEnfermedadComponent {
  tipoEnfermedadPlaga: number = 0; // Cambiar el tipo a número
  enfermedades: string[] = ['Enfermedad 1', 'Enfermedad 2' ];
  plagas: string[] = ['Plaga 1', 'Plaga 2'];
  nombresEnfermedadesPlagas: string[] = [];
  numeroArbol = 89343;
  
  onTipoEnfermedadPlagaChange(event: any) {
    this.tipoEnfermedadPlaga = Number(event.target.value); // Convertir a número
    if (this.tipoEnfermedadPlaga === 0) {
      this.nombresEnfermedadesPlagas = [];
    } else if (this.tipoEnfermedadPlaga === 1) {
      this.nombresEnfermedadesPlagas = this.enfermedades;
    } else if (this.tipoEnfermedadPlaga === 2) {
      this.nombresEnfermedadesPlagas = this.plagas;
    }
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-new-lote',
  templateUrl: './new-lote.component.html',
  styleUrls: ['./new-lote.component.css']
})
export class NewLoteComponent {
  imagenSeleccionada: string | ArrayBuffer | null = null;

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagenSeleccionada = e.target?.result || null; // Añadir un valor predeterminado
      };
      reader.readAsDataURL(file);
    }
  }
 
}
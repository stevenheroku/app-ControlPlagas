import { Component } from '@angular/core';

@Component({
  selector: 'app-new-arbol',
  templateUrl: './new-arbol.component.html',
  styleUrls: ['./new-arbol.component.css']
})
export class NewArbolComponent {
  imagenSeleccionada: string | ArrayBuffer | null = null;

  crearLote()
  {

  }

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

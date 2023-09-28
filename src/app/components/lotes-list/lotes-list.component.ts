import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoteModel } from '../../shared/models/LoteModel';
import { RestsService } from '../../shared/services/rests.service'
import { MainService } from '../../shared/services/main.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lotes-list',
  templateUrl: './lotes-list.component.html',
  styleUrls: ['./lotes-list.component.css']
})
export class LotesListComponent {
  lotes: LoteModel[] = [];
  responseData: LoteModel[] = [];
  resultsLength = 0;
  searchTerm: string = '';
  filteredLotes: any[] = [];
  isLoadingResults = true;
  LoteId:Number=0;

  //variables globales
  NombreFinca:string="";
  EmpleadoId:number=0;
  constructor(private router: Router,private http: RestsService) { }

  ngOnInit() :void{
    const IdFinca = localStorage.getItem('IdFinca'); // 
    const fincaNombre = localStorage.getItem('Finca'); //
    const idEpl = localStorage.getItem('IdEmpleado'); //

    if(fincaNombre!=null&&(idEpl!=null))
    {
      this.NombreFinca=fincaNombre.replace(/"/g,'');
      this.NombreFinca = this.NombreFinca.toUpperCase();
      this.EmpleadoId=parseInt(idEpl);
    } 
    this.http.getLotes2(Number(IdFinca)).subscribe(data => {
      if (data.state === 200) {
        const lote = data.data[0] as any;
        this.lotes = [lote]; // Asigna los datos a this.lotes
        // Asigna los mismos datos a filteredLotes
        console.log(this.lotes);
        this.filteredLotes=lote;
        console.log(this.filteredLotes);
      } else {
        this.isLoadingResults = false;
      }
    });
  }
  searchLotes() {
    this.filteredLotes = this.lotes.filter(
      (lote) => lote.Identificador.toString().includes(this.searchTerm)
      );
      this.filteredLotes = this.lotes;
  }

  filtrarArbolesPorLote(idLote: number,identificador:number) {
    // Luego, navega a la vista "arbolesPag" y pasa el parámetro "idLote" como query parameter
    console.log("vistalot:"+idLote+"_"+identificador)
    //this.router.navigate(['arbolesPag/'], { queryParams: { idLote } });
    this.router.navigate([`arbolesPag/${idLote}/${identificador}`])

  }
  viewNuevoLote() {
    // Aquí reemplaza 'nombre-de-la-vista' con el nombre de la ruta a la que deseas redirigir
    this.router.navigate([`newLote/${this.LoteId}`])
  }

  viewEditLote(idLote:number) {
    // Aquí reemplaza 'nombre-de-la-vista' con el nombre de la ruta a la que deseas redirigir
    this.router.navigate([`newLote/${idLote}`])
  }
  eliminarLote(loteId: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Desea Eliminarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario confirmó la eliminación, entonces procede con la eliminación
        this.http.deleteLote(this.EmpleadoId, loteId).subscribe(data => {
          if (data.state === 200) {
            Swal.fire({
              title: 'Lote Eliminado',
              text: 'El lote se ha eliminado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              // Navega a la misma vista para recargarla
              window.location.reload();
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Error al eliminar el lote',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      }
    });
  }
}
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
  originalLotes:any[]=[]
  isLoadingResults:boolean= false;
  LoteId:Number=0;
  NumeroFinca:Number=0;
  //variables globales
  NombreFinca:string="";
  EmpleadoId:number=0;
  constructor(private router: Router,private http: RestsService) { }

  ngOnInit() :void{
    const IdFinca = localStorage.getItem('IdFinca'); // 
    const fincaNombre = localStorage.getItem('Finca'); //
    const idEpl = localStorage.getItem('IdEmpleado'); //

    if(fincaNombre!=null&&(idEpl!=null)&&(IdFinca!=null))
    {
      this.NombreFinca=fincaNombre.replace(/"/g,'');
      this.NombreFinca = this.NombreFinca.toUpperCase();
      this.EmpleadoId=parseInt(idEpl);
      this.NumeroFinca = parseInt(IdFinca);
    } 
    /*this.http.getLotes2(Number(IdFinca)).subscribe(data => {
      if (data.state === 200) {
        const lote = data.data[0] as any;
        this.lotes = [lote];
        this.originalLotes = [lote];
        this.filteredLotes = lote;
        this.isLoadingResults = true;
        console.log(this.lotes);
        console.log(this.filteredLotes);
      } else {
        // Si ocurre un error
        this.isLoadingResults = true;
      }
    });*/
    this.lotesVer(this.NumeroFinca);
  }
  lotesVer(finca:Number)
  {
    this.http.getLotes2(Number(finca)).subscribe(data => {
      if (data.state === 200) {
        const lote = data.data[0] as any;
        this.lotes = [lote];
        this.originalLotes = lote;
        this.filteredLotes = lote;
        this.isLoadingResults = true;
        console.log(this.lotes);
        console.log(this.filteredLotes);
      } else {
        // Si ocurre un error
        this.isLoadingResults = true;
      }
    });
  }
  
  searchLotes() {
    const searchTermLower = this.searchTerm.trim().toLowerCase();
  
    if (searchTermLower === '') {
      // Si el campo de búsqueda está vacío, muestra todos los elementos nuevamente
      this.filteredLotes=this.originalLotes;
    } else {
      // Realiza la búsqueda filtrada
      this.filteredLotes = this.originalLotes.filter((lote) => {
        // Verifica si lote está definido antes de acceder a sus propiedades
        if (lote) {
          return (
            (lote.IdIdentificadorLote && lote.IdIdentificadorLote.toString().includes(searchTermLower)) ||
            (lote.Empleado && lote.Empleado.toLowerCase().includes(searchTermLower))
          );
        }
        return false; // Si lote es undefined, no lo incluye en los resultados
      });
    }
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
      title: '¿Estás seguro que desea eliminar el Lote?',
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
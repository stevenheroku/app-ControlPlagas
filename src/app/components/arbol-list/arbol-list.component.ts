import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestsService } from '../../shared/services/rests.service';
import { LoteModel } from 'src/app/shared/models/LoteModel';
import { ArbolModel } from 'src/app/shared/models/ArbolModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-arbol-list',
  templateUrl: './arbol-list.component.html',
  styleUrls: ['./arbol-list.component.css']
})

export class ArbolListComponent {
  arboles: ArbolModel[] = [];
  responseData: ArbolModel[] = [];
  resultsLength = 0;
  searchTerm: string = '';
  filteredLotes: any[] = [];
  originalLotes:any[]=[]
  isLoadingResults = false;
  LoteId:Number=0;
  ArbolId:number=0;
  LoteIdentificadorId:Number=0;
  EmpleadoId:number=0;
  constructor(private router: Router, private http: RestsService,private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const idLote = params['idLote'];
      const identificadorLote = params['identificador'];
      const idEpl = params['IdEmpleado'];
      console.log("IDLOTE2_:"+idLote)
      // Ahora puedes usar el valor de "idLote" en esta vista para filtrar los árboles
     this.LoteId=idLote;
     this.LoteIdentificadorId= identificadorLote;
     this.EmpleadoId=idEpl;
    });
    this.ArbolerVer(this.LoteId);
  // Inicializa los lotes filtrados al inicio
  }
  ArbolerVer(idLote:Number)
  {
    this.http.getArboles2(Number(idLote)).subscribe(data => {
      if (data.state === 200) {
        const arboles = data.data[0] as any;
        this.arboles = [arboles]; // Asigna los datos a this.lotes
        this.originalLotes = arboles;
        // Asigna los mismos datos a filteredLotes
        this.filteredLotes=arboles;
        this.isLoadingResults=true;
      } else {
        this.isLoadingResults = true;
      }
    });
  }

  searchArboles() {
    const searchTermLower = this.searchTerm.trim().toLowerCase();
  
    if (searchTermLower === '') {
      // Si el campo de búsqueda está vacío, muestra todos los elementos nuevamente
      this.filteredLotes=this.originalLotes;
    } else {
      // Realiza la búsqueda filtrada
      this.filteredLotes = this.originalLotes.filter((arboles) => {
        // Verifica si lote está definido antes de acceder a sus propiedades
        if (arboles) {
          return (
            (arboles.IdentificadorArbol && arboles.IdentificadorArbol.toString().includes(searchTermLower)) ||
            (arboles.Empleado && arboles.Empleado.toLowerCase().includes(searchTermLower))
          );
        }
        return false; // Si lote es undefined, no lo incluye en los resultados
      });
    }
  }
  eliminarArbol(ArbolId: number) {
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
        this.http.deleteArbol(this.EmpleadoId, ArbolId).subscribe(data => {
          if (data.state === 200) {
            Swal.fire({
              title: 'Árbol Eliminado',
              text: 'El árbol se ha eliminado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              // Navega a la misma vista para recargarla
              window.location.reload();
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Error al eliminar el árbol',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      }
    });
  }
  navigateListaArboles() {
    // Aquí reemplaza 'nombre-de-la-vista' con el nombre de la ruta a la que deseas redirigir
    this.router.navigate([`listArboles/${this.LoteId}/${this.LoteIdentificadorId}`])
  }
  viewNuevoArbol() {
    // Aquí reemplaza 'nombre-de-la-vista' con el nombre de la ruta a la que deseas redirigir
    this.router.navigate([`newArbol/${this.LoteId}/${this.LoteIdentificadorId}/${this.ArbolId}`])
  }
  viewEditarArbol(idArbol:number) {
    // Aquí reemplaza 'nombre-de-la-vista' con el nombre de la ruta a la que deseas redirigir
    this.router.navigate([`newArbol/${this.LoteId}/${this.LoteIdentificadorId}/${idArbol}`])
  }
  viewStatusArbol(idArbol:number)
  {
    console.log("IDARBOL_:"+idArbol)
    this.router.navigate([`statusArbol/${this.LoteId}/${this.LoteIdentificadorId}/${idArbol}`])

  }
  viewStatusMedicoArbol(idArbol:number,identificadorArbol:number)
  {
    console.log("IDARBOL_:"+idArbol)
    //this.router.navigate([`arbolQuimicos/${this.LoteId}/${this.LoteIdentificadorId}/${idArbol}/${identificadorArbo}`])
    this.router.navigate([`revisionControl/${this.LoteId}/${this.LoteIdentificadorId}/${idArbol}/${identificadorArbol}`])

  }
  viewControlArbol(idArbol:number)
  {
    this.router.navigate([`controlArbol/${this.LoteId}/${this.LoteIdentificadorId}/${idArbol}`])
  }
}

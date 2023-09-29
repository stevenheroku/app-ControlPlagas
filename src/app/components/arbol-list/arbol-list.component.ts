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
    this.http.getArboles2(Number(this.LoteId)).subscribe(data => {
      if (data.state === 200) {
        const lote = data.data[0] as any;
        this.arboles = [lote]; // Asigna los datos a this.lotes
        // Asigna los mismos datos a filteredLotes
        this.filteredLotes=lote;
        this.isLoadingResults=true;
      } else {
        this.isLoadingResults = true;
      }
    });
    this.filteredLotes = this.arboles; // Inicializa los lotes filtrados al inicio
  }

  searchLotes() {
    this.filteredLotes = this.arboles.filter(
      (arboles) => arboles.IdArbol.toString().includes(this.searchTerm)
    );
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

import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArbolEnfermedadModel } from 'src/app/shared/models/ArbolEnfermedadModel';
import { ArbolPlagaModel } from 'src/app/shared/models/ArbolPlagaModel';
import { RestsService } from 'src/app/shared/services/rests.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-quimicos-recomendados',
  templateUrl: './quimicos-recomendados.component.html',
  styleUrls: ['./quimicos-recomendados.component.css']
})
export class QuimicosRecomendadosComponent {
  @ViewChild('pdfContent', { static: false }) pdfContent: ElementRef | undefined;

  LoteId:number=0;
  LoteIdentificadorId:number=0;
  IdentificadorArbol:number=0;
  ArbolId:number=0;
  ArbolesPlaga:any[]=[];
  ArbolesEnfermedad:any[]=[];
  NombreFinca:string='';
  FechaControl:string='';
  isLoadingResults:boolean=false;
  isCreatingPDF:boolean=false;
  constructor(private router: Router,private http: RestsService,private route: ActivatedRoute) {     this.pdfContent = undefined;
  }
  ngOnInit(): void {
    const fincaNombre = localStorage.getItem('Finca'); // 
    if ((fincaNombre!=null)) {
      this.NombreFinca=fincaNombre.replace(/"/g,'').toUpperCase();
    }
    this.route.params.subscribe(params => {
      const idLote = params['idLote'];
      const identificadorLote = params['identificador'];
      const idArbol = params['idArbol'];
      const idArbolIdentificador = params['idArbolIdentificador'];
      const fechaControl = params['fechaControl'];
      this.FechaControl=fechaControl;
      this.ArbolId=idArbol;
      console.log("IDLOTE2_:"+idLote)
      // Ahora puedes usar el valor de "idLote" en esta vista para filtrar los árboles
     this.LoteId=idLote;
     this.LoteIdentificadorId= identificadorLote;
     this.IdentificadorArbol=idArbolIdentificador;
    });
    this.getPlagasArbol();
    this.getEnfermedadesArbol();
    if(this.ArbolesPlaga.length>0 )
    {
      Swal.fire({
        title:'Plagas Y Enfermedades',
        text: 'No Existen Plagas y Enfermedades Registadas',
        icon:'success',
        confirmButtonText: 'Aceptar'
      })
    }
  }
  navigateListaArboles() {
    // Aquí reemplaza 'nombre-de-la-vista' con el nombre de la ruta a la que deseas redirigir
    //this.router.navigate([`listArboles/${this.LoteId}/${this.LoteIdentificadorId}`])
    this.router.navigate([`revisionControl/${this.LoteId}/${this.LoteIdentificadorId}/${this.ArbolId}/${this.IdentificadorArbol}`])

  }

  getPlagasArbol()
  {
    this.http.getArbolPlagas(this.ArbolId,this.FechaControl).subscribe(result=>{
      if(result.state==200){
        const plagas = result.data[0] as any;
        const resultado = plagas;
        this.ArbolesPlaga =resultado;
        this.isLoadingResults=true;
        console.log(this.ArbolesPlaga)
      }else{
       this.isLoadingResults=true;
      }
    })
  }

  getEnfermedadesArbol()
  {
    this.http.getArbolEnfermedades(this.ArbolId,this.FechaControl).subscribe(result=>{
      if(result.state==200){
        const enfermedadesArbol = result.data[0] as any;
        const resultado = enfermedadesArbol;
        this.isLoadingResults=true;

        this.ArbolesEnfermedad = resultado;
      }else{
        this.isLoadingResults=true;

      }
    })
  }
  generarPDF() {
    this.isCreatingPDF = true; 

    if (this.pdfContent) {
      const content = this.pdfContent.nativeElement;
      // Realiza las operaciones con "content" aquí
      // Captura la vista en un lienzo usando html2canvas
      html2canvas(content).then(canvas => {
        // Obtén las dimensiones de la imagen capturada
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        // Crea un nuevo objeto jsPDF con las dimensiones de la imagen
        const pdf = new jsPDF({
          orientation: 'portrait', // Puedes cambiar a 'landscape' si es necesario
          unit: 'mm',
          format: [imgWidth, imgHeight] // Establece el tamaño del PDF según las dimensiones de la imagen
        });
  
        // Convierte el lienzo a una imagen base64
        const imgData = canvas.toDataURL('image/png');
  
        // Agrega la imagen al PDF
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  
        // Descarga el PDF con un nombre de archivo
        pdf.save('Reporte_Arbol:'+`${this.IdentificadorArbol}`+'_ControlDia:'+`${this.FechaControl}.pdf`);
        
        this.isCreatingPDF = false; // Ocultar spinner de carga
      });
    } else {
      console.error('El elemento pdfContent no está definido.');
      this.isLoadingResults = true; // Ocultar spinner de carga en caso de error
    }
  }
}

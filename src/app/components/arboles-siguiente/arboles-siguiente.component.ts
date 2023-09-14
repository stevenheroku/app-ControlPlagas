import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-arboles-siguiente',
  templateUrl: './arboles-siguiente.component.html',
  styleUrls: ['./arboles-siguiente.component.css']
})
export class ArbolesSiguienteComponent {
  loteId:number=0;
  identificador:number=0;
  constructor(private router:Router,private activateRouter:ActivatedRoute) 
  {}

  ngOnInit() {
    this.activateRouter.params.subscribe(params => {
      const idLote = params['idLote'];
      const idIdentificador = params['identificador'];
      this.identificador = idIdentificador;
      this.loteId = idLote;
      console.log("IDLOTE_:"+this.loteId)
      console.log("IDENTIFICADOR_:"+this.identificador)

    });
    
  }
  listaArboles(){

    this.router.navigate([`listArboles/${this.loteId}`])
  }
}

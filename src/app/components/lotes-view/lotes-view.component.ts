import { Component, OnInit } from '@angular/core';
import { LoteModel } from '../../shared/models/LoteModel';
import { RestsService } from '../../shared/services/rests.service'


@Component({
  selector: 'app-lotes-view',
  templateUrl: './lotes-view.component.html',
  styleUrls: ['./lotes-view.component.css']
})
export class LotesViewComponent {
  NombreFinca:string="";

  ngOnInit(): void {
  const fincaNombre = localStorage.getItem('Finca'); // 
  if(fincaNombre!=null)
  {
    this.NombreFinca=fincaNombre.replace(/"/g,'');
  }
  

  }
}

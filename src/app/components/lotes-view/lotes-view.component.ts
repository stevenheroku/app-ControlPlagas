import { Component, OnInit } from '@angular/core';
import { LoteModel } from '../../shared/models/LoteModel';
import { RestsService } from '../../shared/services/rests.service'


@Component({
  selector: 'app-lotes-view',
  templateUrl: './lotes-view.component.html',
  styleUrls: ['./lotes-view.component.css']
})
export class LotesViewComponent implements OnInit{
  lotes: LoteModel[] = [];

  constructor(private loteService: RestsService) {}

  ngOnInit() {
    this.lotes = this.loteService.obtenerLotes();
  }
}

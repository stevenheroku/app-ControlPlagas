import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private router:Router) { }

  lotes(){
    this.router.navigate(['lotes'])
  }
  finca(){
    this.router.navigate(['finca'])
  }
  reporte(){
    this.router.navigate(['reporteControl'])
  }
}

import { Component ,OnInit} from '@angular/core';
import { MainService } from 'src/app/shared/services/main.service';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-logueado',
  templateUrl: './logueado.component.html',
  styleUrls: ['./logueado.component.css']
})
export class LogueadoComponent implements OnInit{
  IdEmpleado:number=0;
  NombreRol:string="";
  NombreEmpleado:string="";
  NombreFinca:string="";
  constructor(private mainService: MainService,private authService: AuthService) {}
    
  ngOnInit(): void {
    const empleadoID = localStorage.getItem('IdEmpleado'); // 
    const fincaNombre = localStorage.getItem('Finca'); // 
    const NombreRol = localStorage.getItem('Rol'); // 
    const nombreApellido = localStorage.getItem('NameApellido'); // 


    
    if ((empleadoID!=null)&&(NombreRol !== null)&&(nombreApellido!=null)&&(fincaNombre!=null)) {
      this.IdEmpleado=Number(empleadoID);
      this.NombreRol=NombreRol.replace(/"/g,'');
      this.NombreEmpleado=nombreApellido.replace(/"/g,'');
      this.NombreFinca=fincaNombre.replace(/"/g,'');
    }
   

    
    console.log('Empleado Logueado:', this.IdEmpleado+' '+this.NombreRol+' '+this.NombreEmpleado+' '+this.NombreFinca);
  }
}

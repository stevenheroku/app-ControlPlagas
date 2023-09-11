import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  public IdEmpleado: number =0;
  public IdLote: number =0;
  public IdArbol: number =0;
  public IdFinca: number =0;
  public Finca: string="";
  public Rol: string="";
  public NameApellido: string="";
}
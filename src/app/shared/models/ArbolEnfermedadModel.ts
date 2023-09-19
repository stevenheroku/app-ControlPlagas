export class ArbolEnfermedadModel{
    constructor(
        public CantidadIndividuos: number,
        public Estacion: string,
        public Enfermedad: string,
        public IdEnfermedad:number,
        public Estructura:string,
        public Quimico: string,
        public Valor: number,
      ) {}
}
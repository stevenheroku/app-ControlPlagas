export class ArbolModel{
    constructor(
        public IdArbol: number,
        public Empleado: number,
        public IdentificadorArbol: number,
        public Longitud: string,
        public Latitud: string,
        public ImagenArbol: string,
        public IdLote:number
      ) {}
}

export class ArbolDetalleModel{
  constructor(
      public IdArbol: number,
      public Empleado: string,
      public IdentificadorArbol: number,
      public longitud: string,
      public latitud: string,
      public ImagenArbol: string,
      public IdLote:number,
      public FechaCreacion:string,
      public color:string,
      public CantidadPlagas:number,
      public CantidadEnfermedades:number

    ) {}
}
import { ArbolEnfermedadModel } from "./ArbolEnfermedadModel";
import { ArbolModel } from "./ArbolModel";
import { ArbolPlagaModel } from "./ArbolPlagaModel";
import { LoteModel } from "./LoteModel";

export class RespuestaLote{
    
    constructor(
        public state:number,
        public data:LoteModel[],
        public message:string,
      ) {}
  }
  export class RespuestaArbol{
    
    constructor(
        public state:number,
        public data:ArbolModel[],
        public message:string,
      ) {}
  }
  export class RespuestaFinca{
    
    constructor(
        public state:number,
        public data:any[],
        public message:string,
      ) {}
  }

  export class RespuestaLogin{
    constructor(
        public state:number,
        public data:any,
        public message:string,
      ) {}
  }


  export class RespuestaCatalogos{
    
    constructor(
        public state:number,
        public data:any[],
        public message:string,
      ) {}
  }

  export class RespuestaTipoControl{
    
    constructor(
        public state:number,
        public data:any[],
        public message:string,
      ) {}
  }

  export class RespuestaArbolPlaga{
    
    constructor(
        public state:number,
        public data:ArbolPlagaModel[],
        public message:string,
      ) {}
  }

  export class RespuestaArbolEnfermedad{
    
    constructor(
        public state:number,
        public data:ArbolEnfermedadModel[],
        public message:string,
      ) {}
  }

  export class RespuestaEliminarArbol{
    
    constructor(
        public state:number,
        public data:string,
        public message:string,
      ) {}
  }
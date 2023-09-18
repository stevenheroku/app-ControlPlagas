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
        public data:LoteModel[],
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
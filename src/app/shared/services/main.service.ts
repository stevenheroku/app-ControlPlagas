import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  getLotes() {
    return [
      { fotoArbol: '/assets/img/logo.png', numeroArbol: 1 },
      { fotoArbol: '/assets/img/logo.png', numeroArbol: 2 },
      { fotoArbol: '/assets/img/logo.png', numeroArbol: 3 },
      { fotoArbol: '/assets/img/logo.png', numeroArbol: 4 },
      { fotoArbol: '/assets/img/logo.png', numeroArbol: 4 },
      { fotoArbol: '/assets/img/logo.png', numeroArbol: 4 }
      // ...otros lotes
    ];
  }
}
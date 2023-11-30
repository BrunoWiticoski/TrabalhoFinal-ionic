import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public menus = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Cadastro de Pessoas', url: '/pessoas', icon: 'people-circle' },
    { title: 'Cadastre sua Bicicleta', url: '/bicicleta', icon: 'bicycle' },
    { title: 'Registros de médias', url: '/metas', icon: 'aperture' },
  ];
  constructor() {}
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BicicletaCadastroComponent } from './components/bicicleta-cadastro/bicicleta-cadastro.component';

import { BicicletasListaComponent } from './components/bicicleta-lista/bicicleta-lista.page';

const routes: Routes = [
  {
    path: '',
    component: BicicletasListaComponent
  },
  {
    path: 'cadastro',
    component: BicicletaCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: BicicletaCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BicicletaPageRoutingModule {}

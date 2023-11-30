import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetasCadastroComponent } from './components/metas-cadastro/metas-cadastro.component';

import { MetasListaComponent } from './components/metas-lista/metas-lista.page';

const routes: Routes = [
  {
    path: '',
    component: MetasListaComponent
  },
  {
    path: 'cadastro',
    component: MetasCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: MetasCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetasPageRoutingModule {}

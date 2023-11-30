import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoasCadastroComponent } from './components/pessoas-cadastro/pessoas-cadastro.component';

import { PessoasListaComponent } from './components/pessoas-lista/pessoas-lista.page';

const routes: Routes = [
  {
    path: '',
    component: PessoasListaComponent
  },
  {
    path: 'cadastro',
    component: PessoasCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: PessoasCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PessoasPageRoutingModule {}

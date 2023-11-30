import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { PessoasPageRoutingModule } from './pessoas-routing.module';

import { PessoasListaComponent } from './components/pessoas-lista/pessoas-lista.page';
import { PessoasCadastroComponent } from './components/pessoas-cadastro/pessoas-cadastro.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    PessoasPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [PessoasListaComponent, PessoasCadastroComponent]
})
export class PessoasPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { MetasPageRoutingModule } from './metas-routing.module';

import { MetasListaComponent } from './components/metas-lista/metas-lista.page';
import { MetasCadastroComponent } from './components/metas-cadastro/metas-cadastro.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    MetasPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [MetasListaComponent, MetasCadastroComponent]
})
export class MetasPageModule {}

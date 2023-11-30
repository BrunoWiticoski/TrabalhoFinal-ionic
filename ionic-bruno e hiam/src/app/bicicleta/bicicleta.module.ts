import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { BicicletaPageRoutingModule } from './bicicleta-routing.module';

import { BicicletasListaComponent } from './components/bicicleta-lista/bicicleta-lista.page';
import { BicicletaCadastroComponent } from './components/bicicleta-cadastro/bicicleta-cadastro.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    BicicletaPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [BicicletasListaComponent, BicicletaCadastroComponent]
})
export class BicicletasPageModule {}

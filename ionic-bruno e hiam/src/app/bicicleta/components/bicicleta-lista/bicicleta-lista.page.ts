import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ToastController,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { BicicletaInterface } from '../../types/bicicleta.interface';
import { BicicletaService } from '../../services/bicicleta.service';

@Component({
  selector: 'app-bicicleta',
  templateUrl: './bicicleta-lista.page.html',
  styleUrls: ['./bicicleta-lista.page.scss'],
})
export class BicicletasListaComponent
  implements OnInit, ViewWillEnter, ViewDidLeave, ViewWillLeave, ViewDidLeave
{
  bicicletas: BicicletaInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private BicicletaService: BicicletaService
  ) {}

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.listar();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ngOnInit() {}
  
  // aqui é onde configuramos o botão de excluir e realizado a busca das informações para gerar a lista em tela
  listar() {
    const observable = this.BicicletaService.getBicicletas();
    observable.subscribe(
      (dados) => {
        this.bicicletas = dados.filter(bicicleta => bicicleta.nbicicleta !== undefined && bicicleta.nbicicleta !== null && bicicleta.nbicicleta !== '');
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível listar as bicicletas`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  confirmarExclusao(bicicleta: BicicletaInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o registro ${bicicleta.modelo}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(bicicleta),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(bicicleta: BicicletaInterface) {
    if (bicicleta.id) {
      this.BicicletaService.excluir(bicicleta.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir a bicicleta ${bicicleta.nbicicleta}`,
              duration: 5000,
              keyboardClose: true,
              color: 'danger',
            })
            .then((t) => t.present());
        }
      );
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ToastController,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { PessoaInterface } from '../../types/pessoas.interface';
import { PessoaService } from '../../services/pessoas.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas-lista.page.html',
  styleUrls: ['./pessoas-lista.page.scss'],
})
export class PessoasListaComponent
  implements OnInit, ViewWillEnter, ViewDidLeave, ViewWillLeave, ViewDidLeave
{
  pessoas: PessoaInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private pessoaService: PessoaService
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
    const observable = this.pessoaService.getPessoas();
    observable.subscribe(
      (dados) => {
        this.pessoas = dados.filter(pessoas => pessoas.nome !== undefined && pessoas.nome !== null && pessoas.nome !== '');

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

  confirmarExclusao(pessoa: PessoaInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o registro ${pessoa.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(pessoa),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(pessoa: PessoaInterface) {
    if (pessoa.id) {
      this.pessoaService.excluir(pessoa.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir o registro  ${pessoa.nome}`,
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

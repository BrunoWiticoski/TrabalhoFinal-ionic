import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PessoaInterface } from '../../types/pessoas.interface';
import { PessoaService } from '../../services/pessoas.service';
import { GeneroEnum } from '../../types/genero.enum';


@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.scss'],
})

//aqui é onde declaramos os componentes necessários
export class PessoasCadastroComponent implements OnInit {
  pessoaId: number | null;
  pessoasForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private pessoaService: PessoaService,
    private router: Router
  ) {
    this.pessoaId = null;
    this.pessoasForm = this.createForm();
  }

  // edição
  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.pessoaId = parseInt(id);
      this.pessoaService.getPessoa(this.pessoaId).subscribe((pessoa) => {
        this.pessoasForm = this.createForm(pessoa);
      });
    }
  }

  
  //aqui é onde adicionamos validadores dos campos que compõe a tabela Pessoas
  private createForm(pessoa?: PessoaInterface) {
    return new FormGroup({
      nome: new FormControl(pessoa?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      cpf: new FormControl(pessoa?.cpf || '', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      dataNascimento: new FormControl(
        pessoa?.dataNascimento || new Date().toISOString()
      ),
      genero: new FormControl(
        pessoa?.genero || GeneroEnum.FEMININO,
        Validators.required
      ),
      telefone: new FormControl(pessoa?.telefone || '', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      cidade: new FormControl(pessoa?.cidade || '', [
        Validators.required,
      ])
    });
  }
  
  
  //aqui é onde realiza o processo de salvar as informações
  salvar() {
    const pessoa: PessoaInterface = {
      ...this.pessoasForm.value,
      id: this.pessoaId,
    };
    this.pessoaService.salvar(pessoa).subscribe(
      () => this.router.navigate(['pessoas']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar o cadastro ${pessoa.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nome() {
    return this.pessoasForm.get('nome');
  }
  
}

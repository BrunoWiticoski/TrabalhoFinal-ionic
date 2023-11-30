import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BicicletaInterface } from '../../types/bicicleta.interface';
import { BicicletaService } from '../../services/bicicleta.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bicicleta-cadastro',
  templateUrl: './bicicleta-cadastro.component.html',
  styleUrls: ['./bicicleta-cadastro.component.scss'],
})

//aqui é onde declaramos os componentes necessários adicionando medidasaros fixos para serem selecionados
export class BicicletaCadastroComponent implements OnInit {
  bicicletaId: number | null;
  bicicletasForm: FormGroup;
  pessoas!: string[];
  medidasaros: string[] = ['ARO  12', 'ARO 16', 'ARO 20', 'ARO 24', 'ARO 26', 'ARO 27,5', 'ARO 29'];
  
  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private BicicletaService: BicicletaService,
    private router: Router,
    private http: HttpClient
  ) {
    this.bicicletaId = null;
    this.bicicletasForm = this.createForm();
  }
  
  //aqui é onde adicionamos para realizar o filtro de pessoas cadastradas dentro do Registro de Médias / edição
  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/pessoas').subscribe(
      (pessoas: any[]) => {
        this.pessoas = pessoas
          .map(pessoa => pessoa.nome);
  
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
          this.bicicletaId = parseInt(id);
          this.BicicletaService.getBicicleta(this.bicicletaId).subscribe((bicicleta: BicicletaInterface | undefined) => {
            if (bicicleta) {
              this.bicicletasForm = this.createForm(bicicleta);
            } else {
              console.error("Bicicleta não encontrada.");
            }
          });
        }
      },
      (erro) => {
        console.error(erro);
      }
    );
  }
  
  //aqui é onde adicionamos validadores dos campos que compõe a tabela Bicicletas
  private createForm(bicicleta?: BicicletaInterface) {
    return new FormGroup({
      nbicicleta: new FormControl(bicicleta?.nbicicleta || '', [
        Validators.required,
      ]),
      marca: new FormControl(bicicleta?.marca || '', [
        Validators.required,
      ]),
      modelo: new FormControl(bicicleta?.modelo || '', [
        Validators.required,
      ]),
      chassi: new FormControl(bicicleta?.chassi || '', [
        Validators.required,
        Validators.maxLength(10)
      ]),
      cor: new FormControl(bicicleta?.cor || '', [
        Validators.required,
      ]),
      medidaaro: new FormControl(bicicleta?.medidaaro || '', [
        Validators.required,
      ]),
      ntf: new FormControl(bicicleta?.ntf || '', [
        Validators.minLength(44),
        Validators.maxLength(44)
      ])
    });
  }
  
  //aqui é onde realiza o processo de salvar as informações
  salvar() {
    const bicicleta: BicicletaInterface = {
      ...this.bicicletasForm.value,
      id: this.bicicletaId,
    };
    this.BicicletaService.salvar(bicicleta).subscribe(
      () => this.router.navigate(['bicicleta']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar a bicicleta ${bicicleta.nbicicleta}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nbicicleta() {
    return this.bicicletasForm.get('nbicicleta');
  }
  
}



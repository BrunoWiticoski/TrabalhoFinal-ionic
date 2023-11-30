import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MetaInterface } from '../../types/metas.interface';
import { MetaService } from '../../services/metas.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-metas-cadastro',
  templateUrl: './metas-cadastro.component.html',
  styleUrls: ['./metas-cadastro.component.scss'],
})

//aqui é onde declaramos os componentes necessários
export class MetasCadastroComponent implements OnInit {
  metaId: number | null;
  metasForm: FormGroup;
  pessoas!: string[];

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private metaService: MetaService,
    private router: Router,
    private http: HttpClient
  ) {
    this.metaId = null;
    this.metasForm = this.createForm();
  }
  
  //aqui é onde adicionamos para realizar o filtro de pessoas cadastradas dentro do Registro de Médias / edição
  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/pessoas').subscribe(
      (pessoas: any[]) => {
        this.pessoas = pessoas
          .map(pessoa => pessoa.nome);
  
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
          this.metaId = parseInt(id);
          this.metaService.getMeta(this.metaId).subscribe((meta: MetaInterface | undefined) => {
            if (meta) {
              this.metasForm = this.createForm(meta);
            } else {
              console.error("Bicicleta não encontrada.");
            }
          });
        }
        this.metasForm.get('km')?.valueChanges.subscribe(() => {
          this.updateMedia();
        });
        this.metasForm.get('tempo')?.valueChanges.subscribe(() => {
          this.updateMedia();
        });
      },
      (erro) => {
        console.error(erro);
      }
    );
  }

  //aqui é onde adicionamos validadores dos campos que compõe a tabela Metas
  private createForm(meta?: MetaInterface) {
    return new FormGroup({
      nmeta: new FormControl(meta?.nmeta || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      tempo: new FormControl(meta?.tempo || '', [
        Validators.required,
      ]),
      km: new FormControl(meta?.km || '', [
        Validators.required,
      ]),
      data: new FormControl(
        meta?.data || new Date().toISOString()
      ),
      media: new FormControl(meta?.media || ''),
      observacao: new FormControl(meta?.observacao || ''),
    });
  }
  
  //aqui é onde realliza a média dos km por hora, gerando o resultado da média, salvando na tabela Metas - coluna media
  updateMedia() {
    const kmValue = this.metasForm.get('km')?.value;
    const tempoValue = this.metasForm.get('tempo')?.value;
    if (kmValue && tempoValue) {
      const mediaValue = kmValue / tempoValue;
      this.metasForm.get('media')?.setValue(mediaValue.toFixed(2));
    }
  }

  //aqui é onde realiza o processo de salvar as informações
  salvar() {
    const meta: MetaInterface = {
      ...this.metasForm.value,
      id: this.metaId,
    };
    this.metaService.salvar(meta).subscribe(
      () => this.router.navigate(['metas']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar o registro ${meta.nmeta}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nmeta() {
    return this.metasForm.get('nmeta');
  }
  
}

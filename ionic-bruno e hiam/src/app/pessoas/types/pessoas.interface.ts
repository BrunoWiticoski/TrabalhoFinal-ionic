import { GeneroEnum } from './genero.enum';

export interface PessoaInterface {
  id?: number | null;
  nome: string;
  cpf: number | null;
  dataNascimento: Date;
  genero: GeneroEnum;
  telefone:number | null;
  cidade: string;
}

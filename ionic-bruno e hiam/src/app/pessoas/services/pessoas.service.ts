import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PessoaInterface } from '../types/pessoas.interface';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private url = 'http://localhost:3000/pessoas';

  constructor(
    private httpClient: HttpClient
  ) {}

  getPessoas(): Observable<PessoaInterface[]> {
    return this.httpClient.get<PessoaInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  

  getPessoa(id: number): Observable<PessoaInterface> {
    return this.httpClient.get<PessoaInterface>(`${this.url}/${id}`);
  }

  private adicionar(pessoa: PessoaInterface)  {
    return this.httpClient.post(this.url, pessoa);
  }

  private atualizar(pessoa: PessoaInterface) {
    return this.httpClient.put(`${this.url}/${pessoa.id}`, pessoa);
  }

  salvar(pessoa: PessoaInterface) {
    if(pessoa.id) {
      return this.atualizar(pessoa);
    } else {
      return this.adicionar(pessoa);
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetaInterface } from '../types/metas.interface';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  private url = 'http://localhost:3000/metas';

  constructor(
    private httpClient: HttpClient
  ) {}

  getMetas(): Observable<MetaInterface[]> {
    return this.httpClient.get<MetaInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getMeta(id: number): Observable<MetaInterface> {
    return this.httpClient.get<MetaInterface>(`${this.url}/${id}`);
  }

  private adicionar(meta: MetaInterface)  {
    return this.httpClient.post(this.url, meta);
  }

  private atualizar(meta: MetaInterface) {
    return this.httpClient.put(`${this.url}/${meta.id}`, meta);
  }

  salvar(meta: MetaInterface) {
    if(meta.id) {
      return this.atualizar(meta);
    } else {
      return this.adicionar(meta);
    }
  }
}

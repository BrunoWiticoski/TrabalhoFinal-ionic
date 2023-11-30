import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BicicletaInterface } from '../types/bicicleta.interface';

@Injectable({
  providedIn: 'root'
})
export class BicicletaService {

  private url = 'http://localhost:3000/bicicletas';

  constructor(
    private httpClient: HttpClient
  ) {}

  getBicicletas(): Observable<BicicletaInterface[]> {
    return this.httpClient.get<BicicletaInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getBicicleta(id: number): Observable<BicicletaInterface> {
    return this.httpClient.get<BicicletaInterface>(`${this.url}/${id}`);
  }

  private adicionar(bicicleta: BicicletaInterface)  {
    return this.httpClient.post(this.url, bicicleta);
  }

  private atualizar(bicicleta: BicicletaInterface) {
    return this.httpClient.put(`${this.url}/${bicicleta.id}`, bicicleta);
  }

  salvar(bicicleta: BicicletaInterface) {
    if(bicicleta.id) {
      return this.atualizar(bicicleta);
    } else {
      return this.adicionar(bicicleta);
    }
  }
}
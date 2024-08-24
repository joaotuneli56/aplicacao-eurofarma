import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colaborador } from '../Models/colaborador';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  private apiUrl = 'http://localhost:3000/colaboradores';

  constructor(private http: HttpClient) { }

  // Método para listar todos os colaboradores
  getColaboradores(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(this.apiUrl);
  }

  // Método para obter um colaborador por ID
  getColaboradorById(id: number): Observable<Colaborador> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Colaborador>(url);
  }

  // Método para adicionar um novo colaborador
  addColaborador(colaborador: Colaborador): Observable<Colaborador> {
    return this.http.post<Colaborador>(this.apiUrl, colaborador);
  }

  // Método para atualizar um colaborador existente
  updateColaborador(colaborador: Colaborador): Observable<Colaborador> {
    const url = `${this.apiUrl}/${colaborador.id}`;
    return this.http.put<Colaborador>(url, colaborador);
  }

  // Método para deletar um colaborador
  deleteColaborador(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

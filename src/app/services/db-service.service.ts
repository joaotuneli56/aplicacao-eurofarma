import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colaborador } from '../Models/colaborador';
import { Curso } from '../Models/curso';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {
  private apiUrl = 'http://localhost:3000/colaboradores';
  private apiUrlCursos = 'http://localhost:3000/cursos';


  constructor(private http: HttpClient) {}

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrlCursos);
  }

  addCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrlCursos, curso);
  }

  getColaboradores(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(this.apiUrl);
  }

  getColaboradorById(id: number): Observable<Colaborador> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Colaborador>(url);
  }

  addColaborador(colaborador: Colaborador): Observable<Colaborador> {
    return this.http.post<Colaborador>(this.apiUrl, colaborador);
  }

  private generateId(): number {
    // Lógica para gerar um ID único, por exemplo, pegar o último ID e incrementar
    // Supondo que você tenha uma forma de obter todos os colaboradores primeiro
    return Math.floor(Math.random() * 10000); // Exemplo simples
  }

  updateColaborador(colaborador: Colaborador): Observable<Colaborador> {
    const url = `${this.apiUrl}/${colaborador.id}`;
    return this.http.put<Colaborador>(url, colaborador);
  }

  deleteColaborador(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

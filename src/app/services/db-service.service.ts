import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
    colaborador.id = this.generateId(); // Garante que o ID seja gerado corretamente
    return this.http.post<Colaborador>(this.apiUrl, colaborador);
  }

  updateColaborador(colaborador: Colaborador): Observable<Colaborador> {
    const url = `${this.apiUrl}/${colaborador.id}`;
    return this.http.put<Colaborador>(url, colaborador);
  }

  deleteColaborador(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getDepartamentos(): Observable<string[]> {
    return this.getColaboradores().pipe(
      map(colaboradores => {
        const departamentosSet = new Set<string>();
        colaboradores.forEach(colab => {
          if (colab.departamento) {
            departamentosSet.add(colab.departamento);
          }
        });
        return Array.from(departamentosSet);
      })
    );
  }

  generateId(): number {
    return Math.floor(Math.random() * 10000); // Método para gerar ID único
  }
}

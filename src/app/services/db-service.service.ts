import { AuthService } from './auth-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, throwError } from 'rxjs';
import { Colaborador } from '../Models/colaborador';
import { Curso } from '../Models/curso';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {
  private apiUrl = 'http://localhost:3000/colaboradores';
  private apiUrlCursos = 'http://localhost:3000/cursos';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrlCursos);
  }

  addCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrlCursos, curso).pipe(
      map((newCurso: Curso) => {
        // Atualizar os colaboradores atribuídos ao curso
        curso.colaboradoresAtribuidos.forEach(colaboradorId => {
          this.getColaboradorById(colaboradorId).subscribe((colaborador) => {
            if (!colaborador.cursosAtribuidos) {
              colaborador.cursosAtribuidos = [];
            }
            colaborador.cursosAtribuidos.push(newCurso.id);
            this.updateColaborador(colaborador).subscribe();
          });
        });
        return newCurso;
      })
    );
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
  // Obter cursos atribuídos ao colaborador pelo ID do colaborador
  getCursosPorColaboradorId(colaboradorId: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(`http://localhost:3000/cursos?colaboradorId=${colaboradorId}`);
  }
  getColaboradorLogado(): Observable<any> {
    // Verifica se estamos no ambiente de navegador
    if (typeof window !== 'undefined') {
      const colaboradorId = localStorage.getItem('colaboradorId');

      if (colaboradorId) {
        // Faz a requisição ao backend para obter os dados do colaborador logado
        return this.http.get<any>(`${this.apiUrl}/colaboradores/${colaboradorId}`);
      } else {
        // Se não houver colaboradorId no localStorage, retornar um erro ou um Observable vazio
        return throwError(() => new Error('Colaborador não encontrado no localStorage.'));
      }
    } else {
      // Caso não estejamos no ambiente do navegador (como em SSR), retorna um Observable vazio ou lança um erro
      return throwError(() => new Error('localStorage não está disponível no ambiente atual.'));
    }
  }

  getCursosAtribuidos(): Observable<Curso[]> {
    const colaborador = this.authService.getCurrentUser();  // Recupera o colaborador logado

    if (colaborador && colaborador.cursosAtribuidos && colaborador.cursosAtribuidos.length > 0) {
      const ids = colaborador.cursosAtribuidos.join(',');
      return this.http.get<Curso[]>(`${this.apiUrlCursos}?id_in=${ids}`);
    }

    return of([]);  // Retorna um array vazio se o colaborador não tiver cursos atribuídos
  }
}

import { AuthService } from './../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Colaborador } from '../../Models/colaborador';
import { DbServiceService } from './../../services/db-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homegestor',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './homegestor.component.html',
  styleUrl: './homegestor.component.css'
})
export class HomeGestorComponent implements OnInit {
  colaboradores: Colaborador[] = [];
  totalColaboradores: number = 0;
  colaboradoresDoDepartamento: Colaborador[] = [];
  departamentoGestor: string = '';  // Será definido dinamicamente

  constructor(
    private dbService: DbServiceService,
    private router: Router,
    private AuthService: AuthService // Injeção do AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.AuthService.getCurrentUser();

    if (!currentUser || !currentUser.gestor) {
      // Se não estiver logado ou não for gestor, redireciona para login
      this.router.navigate(['/login']);
      return;
    }

    this.departamentoGestor = currentUser.departamento;

    this.dbService.getColaboradores().subscribe(data => {
      this.colaboradores = data;

      // Filtra os colaboradores do mesmo departamento do gestor
      this.colaboradoresDoDepartamento = this.colaboradores.filter(c => c.departamento === this.departamentoGestor);
      this.totalColaboradores = this.colaboradoresDoDepartamento.length;
    });
  }

  logout(): void {
    this.AuthService.logout(); // Chama o método de logout do AuthService
    this.router.navigate(['/login']);
  }
}

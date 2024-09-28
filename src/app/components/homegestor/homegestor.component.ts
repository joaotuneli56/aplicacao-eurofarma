import { AuthService } from './../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Colaborador } from '../../Models/colaborador';
import { DbServiceService } from './../../services/db-service.service';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';

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
  departamentoGestor: string = '';
  totalColaboradoresbarra = 50;
  colaboradoresAtivos = 30;

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

  createChart() {
    const ctx = document.getElementById('colaboradoresChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Dept A', 'Dept B', 'Dept C'],
        datasets: [{
          label: 'Número de Colaboradores',
          data: [10, 20, 30],
          backgroundColor: ['#0D4B8A', '#007bff', '#28a745'],
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}

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
  departamentoGestor: string = 'Comercial';  // Isso pode ser dinâmico de acordo com o gestor logado

  constructor(private dbService: DbServiceService, private router: Router) {}

  ngOnInit(): void {
    this.dbService.getColaboradores().subscribe(data => {
      this.colaboradores = data;
      this.totalColaboradores = this.colaboradores.length;

      // Filtra os colaboradores do mesmo departamento do gestor
      this.colaboradoresDoDepartamento = this.colaboradores.filter(c => c.departamento === this.departamentoGestor);
    });
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}

import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth-service.service';
import { DbServiceService } from './../../services/db-service.service';
import { Colaborador } from '../../Models/colaborador';
import { Curso } from '../../Models/curso';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-area-aprendizado',
  templateUrl: './area-aprendizado.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  styleUrls: ['./area-aprendizado.component.css']
})
export class AreaAprendizadoComponent implements OnInit {
  constructor(private dbService: DbServiceService, private router: Router) {}
  cursos: Curso[] = [];
  modalAberto: boolean = false;
  cursoSelecionado: Curso | null = null;


  ngOnInit(): void {
    this.getCursos();
  }

  getCursos(): void {
    this.dbService.getCursos().subscribe(data => {
      this.cursos = data;
    });
  }

  abrirModal(curso: Curso): void {
    this.cursoSelecionado = curso;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.cursoSelecionado = null;
  }

  visualizarMaterial(): void {
    if (this.cursoSelecionado) {
      // Navegar para a página de materiais do curso
      this.router.navigate(['/curso-material', this.cursoSelecionado.id]);
      this.fecharModal();  // Fecha o modal ao navegar
    }
  }
  logout(): void {
    this.router.navigate(['/login']);
  }
}

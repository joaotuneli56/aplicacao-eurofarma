import { AuthService } from './../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Colaborador } from '../../Models/colaborador';
import { DbServiceService } from '../../services/db-service.service';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from '../cadastro/cadastro.component';

@Component({
  selector: 'app-listacolaboradoresgestor',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    CadastroComponent
  ],
  templateUrl: './listacolaboradoresgestor.component.html',
  styleUrl: './listacolaboradoresgestor.component.css'
})

export class ListaColaboradoresGestorComponent implements OnInit {
  colaboradores: Colaborador[] = [];
  departamentoGestor: string | null = null;

  constructor(private dbService: DbServiceService, private AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Recuperar o usuário atual logado
    const gestor = this.AuthService.getCurrentUser();

    // Verifica se o gestor está logado e obtém seu departamento
    if (gestor) {
      this.departamentoGestor = gestor.departamento; // Supondo que o objeto do gestor tenha o campo departamento
    }

    // Obtém todos os colaboradores e filtra pelo departamento do gestor
    this.atualizarColaboradores();
  }

  atualizarColaboradores(): void {
    this.dbService.getColaboradores().subscribe(data => {
      // Filtra os colaboradores com base no departamento do gestor
      this.colaboradores = data.filter(colaborador => colaborador.departamento === this.departamentoGestor);
    });
  }

  editarColaborador(colaborador: Colaborador): void {
    this.router.navigate(['/editarcolaborador', colaborador.id]);
  }

  removerColaborador(id: number): void {
    if (confirm('Você tem certeza que deseja remover este colaborador?')) {
      this.dbService.deleteColaborador(id).subscribe(() => {
        this.colaboradores = this.colaboradores.filter(c => c.id !== id);
      });
    }
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  onColaboradorAdicionado(): void {
    this.atualizarColaboradores();
  }
}

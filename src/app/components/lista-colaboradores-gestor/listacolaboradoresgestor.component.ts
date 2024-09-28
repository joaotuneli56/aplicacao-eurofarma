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
  colaboradores: any[] = [];
  departamentoGestor: string | null = null;

  constructor(private dbService: DbServiceService, private router: Router) {}

  ngOnInit(): void {
    this.dbService.getColaboradores().subscribe(data => {
      this.colaboradores = data;
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

  atualizarColaboradores(): void {
     this.dbService.getColaboradores().subscribe(data => {
       // Filtra os colaboradores com base no departamento do gestor
       this.colaboradores = data.filter(colaborador => colaborador.departamento === this.departamentoGestor);
     });
  }
}

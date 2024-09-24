import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Colaborador } from '../../Models/colaborador';
import { DbServiceService } from '../../services/db-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listacolaboradoresgestor',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './listacolaboradoresgestor.component.html',
  styleUrl: './listacolaboradoresgestor.component.css'
})

export class ListaColaboradoresGestorComponent implements OnInit {
  colaboradores: any[] = [];

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
}

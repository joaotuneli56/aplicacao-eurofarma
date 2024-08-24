import { DbServiceService } from './../../services/db-service.service';
import { Component, OnInit } from '@angular/core';
import { Colaborador } from '../../Models/colaborador';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listagem-ti',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listagem-ti.component.html',
  styleUrl: './listagem-ti.component.css'
})
export class ListagemTIComponent implements OnInit {
  colaboradores: Colaborador[] = [];

  constructor(private DbServiceService: DbServiceService) { }

  ngOnInit() {
    this.DbServiceService.getColaboradores().subscribe(colaboradores => {
      this.colaboradores = colaboradores.filter(colaborador => colaborador.departamento === 'TI');
    });
  }
}

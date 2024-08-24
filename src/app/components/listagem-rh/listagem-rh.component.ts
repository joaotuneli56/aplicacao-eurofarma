import { DbServiceService } from './../../services/db-service.service';
import { Component, OnInit } from '@angular/core';
import { Colaborador } from '../../Models/colaborador';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listagem-rh',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listagem-rh.component.html',
  styleUrl: './listagem-rh.component.css'
})
export class ListagemRHComponent implements OnInit {
  colaboradores: Colaborador[] = [];

  constructor(private DbServiceService: DbServiceService) { }

  ngOnInit() {
    this.DbServiceService.getColaboradores().subscribe(colaboradores => {
      this.colaboradores = colaboradores.filter(colaborador => colaborador.departamento === 'RH');
    });
  }
}

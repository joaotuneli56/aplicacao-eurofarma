import { DbServiceService } from './../../services/db-service.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Colaborador } from '../../Models/colaborador';

@Component({
  selector: 'app-listagem-comercial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listagem-comercial.component.html',
  styleUrl: './listagem-comercial.component.css'
})
export class ListagemComercialComponent implements OnInit {
  colaboradores: Colaborador[] = [];

  constructor(private DbServiceService: DbServiceService) { }

  ngOnInit() {
    this.DbServiceService.getColaboradores().subscribe(colaboradores => {
      this.colaboradores = colaboradores.filter(colaborador => colaborador.departamento === 'Comercial');
    });
  }
}

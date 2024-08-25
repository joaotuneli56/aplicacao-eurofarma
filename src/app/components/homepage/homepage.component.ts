import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ListagemComercialComponent } from '../listagem-comercial/listagem-comercial.component';
import { ListagemRHComponent } from '../listagem-rh/listagem-rh.component';
import { ListagemTIComponent } from '../listagem-ti/listagem-ti.component';
import { Colaborador } from '../../Models/colaborador';
import { DbServiceService } from './../../services/db-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    RouterOutlet,
    ListagemComercialComponent,
    ListagemRHComponent,
    ListagemTIComponent,
    CommonModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomeComponent implements OnInit {
  colaboradores: any[] = [];

  constructor(private dbService: DbServiceService, private router: Router) {}

  ngOnInit(): void {
    this.dbService.getColaboradores().subscribe(data => {
      this.colaboradores = data;
    });
  }

  logout(): void {
    // Implementar a lógica de logout
    this.router.navigate(['/login']);
  }
}

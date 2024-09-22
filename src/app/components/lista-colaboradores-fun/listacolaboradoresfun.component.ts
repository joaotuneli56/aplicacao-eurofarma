import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Colaborador } from '../../Models/colaborador';
import { DbServiceService } from '../../services/db-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listacolaboradoresfun',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './listacolaboradoresfun.component.html',
  styleUrl: './listacolaboradoresfun.component.css'
})
export class ListaColaboradoresFunComponent implements OnInit {
  colaboradores: any[] = [];

  constructor(private dbService: DbServiceService, private router: Router) {}

  ngOnInit(): void {
    this.dbService.getColaboradores().subscribe(data => {
      this.colaboradores = data;
    });
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}

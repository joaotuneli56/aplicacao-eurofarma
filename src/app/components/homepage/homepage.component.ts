import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Colaborador } from '../../Models/colaborador';
import { DbServiceService } from './../../services/db-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    RouterOutlet,
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
    this.router.navigate(['/login']);
  }
}

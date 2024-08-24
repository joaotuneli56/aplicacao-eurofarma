import { Router } from '@angular/router';
import { DbServiceService } from './../../services/db-service.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  erroLogin: string = '';

  constructor(private DbServiceService: DbServiceService, private router: Router) { }

  onLogin() {
    this.DbServiceService.getColaboradores().subscribe(colaboradores => {
      const usuario = colaboradores.find(colaborador => colaborador.email === this.email && colaborador.senha === this.senha);

      if (usuario) {
        // Redireciona para a HomePage
        this.router.navigate(['/home']);
      } else {
        this.erroLogin = 'Email ou senha inválidos!';
      }
    });
  }

  onCadastrar() {
    // Redireciona para a tela de cadastro
    this.router.navigate(['/cadastro']);
  }
}

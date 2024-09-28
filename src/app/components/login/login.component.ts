import { AuthService } from './../../services/auth-service.service';
import { Router } from '@angular/router';
import { DbServiceService } from './../../services/db-service.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Colaborador } from '../../Models/colaborador';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dbService: DbServiceService,
    private AuthService: AuthService // Injeção do AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  redirecionarParaHome(colaborador: Colaborador): void {
    if (colaborador.gestor) {
      this.router.navigate(['/home-gestor']);
    } else {
      this.router.navigate(['/home-colaborador']);
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;
    const senha = this.loginForm.value.senha;

    this.dbService.getColaboradores().subscribe(colaboradores => {
      const colaborador = colaboradores.find(c => c.email === email && c.senha === senha);

      if (colaborador) {
        this.AuthService.setCurrentUser(colaborador); // Armazena o usuário logado
        this.successMessage = 'Login realizado com sucesso!';
        this.errorMessage = null;

        setTimeout(() => {
          this.redirecionarParaHome(colaborador);
        }, 1000);
      } else {
        this.successMessage = null;
        this.errorMessage = 'Email ou senha incorretos. Tente novamente.';
      }
    });
  }

  irParaCadastro(): void {
    this.router.navigate(['/cadastro']);
  }
}

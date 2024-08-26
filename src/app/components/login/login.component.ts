import { Router } from '@angular/router';
import { DbServiceService } from './../../services/db-service.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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
  errorMessage: string | null = null; // Mensagem de erro

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dbService: DbServiceService // Adiciona o serviço DbServiceService
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

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;
    const senha = this.loginForm.value.senha;

    // Verifica o email e a senha com os dados no db.json
    this.dbService.getColaboradores().subscribe(colaboradores => {
      const colaborador = colaboradores.find(c => c.email === email && c.senha === senha);

      if (colaborador) {
        // Login bem-sucedido
        this.successMessage = 'Login realizado com sucesso!';
        this.errorMessage = null;

        setTimeout(() => {
          this.redirecionarParaHome();
        }, 1000); // Espera 1 segundo antes de redirecionar para mostrar a mensagem
      } else {
        // Login falhou
        this.successMessage = null;
        this.errorMessage = 'Email ou senha incorretos. Tente novamente.';
      }
    });
  }

  redirecionarParaHome(): void {
    this.router.navigate(['/home']);
  }

  irParaCadastro(): void {
    this.router.navigate(['/cadastro']);
  }
}

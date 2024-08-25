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
  successMessage: string | null = null; // Adiciona uma propriedade para a mensagem de sucesso

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
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

    // Aqui você pode adicionar a lógica de autenticação

    // Defina a mensagem de sucesso e depois redirecione
    this.successMessage = 'Login realizado com sucesso!';

    setTimeout(() => {
      this.redirecionarParaHome();
    }, 1000); // Espera 1 segundo antes de redirecionar para mostrar a mensagem
  }

  redirecionarParaHome(): void {
    this.router.navigate(['/home']);
  }

  irParaCadastro(): void {
    this.router.navigate(['/cadastro']);
  }
}

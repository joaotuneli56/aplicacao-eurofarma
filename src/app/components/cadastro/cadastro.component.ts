import { DbServiceService } from './../../services/db-service.service';
import { Component, OnInit } from '@angular/core';
import { Colaborador } from '../../Models/colaborador';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { error } from 'console';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;
  submitted = false;
  successMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      departamento: ['', Validators.required],
      gestor: ['', Validators.required]
    });
  }

  get f() {
    return this.cadastroForm.controls;
  }

  cadastrar() {
    this.submitted = true;

    if (this.cadastroForm.invalid) {
      return;
    }

    // Dados do formulário
    const novoColaborador = this.cadastroForm.value;

    // Requisição para adicionar o colaborador
    this.http.post('http://localhost:3000/colaboradores', novoColaborador)
      .subscribe({
        next: () => {
          // Mensagem de sucesso
          this.successMessage = 'Cadastro realizado com sucesso!';

          // Limpar formulário após o sucesso
          this.cadastroForm.reset();
          this.submitted = false;

          // Redirecionar para a tela de login após 2 segundos
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          console.error('Erro ao cadastrar colaborador', err);
          // Tratar erro, se necessário
        }
      });
  }

  irParaLogin() {
    this.router.navigate(['/login']);
  }
}

import { DbServiceService } from './../../services/db-service.service';
import { Component, OnInit } from '@angular/core';
import { Colaborador } from '../../Models/colaborador';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;
  successMessage: string | null = null;
  departamentos: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dbService: DbServiceService
  ) {}

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      departamento: ['', Validators.required],
      cargo: ['', Validators.required],
      gestor: [false]
    });

    this.dbService.getDepartamentos().subscribe(
      departamentos => {
        this.departamentos = departamentos;
      },
      error => {
        console.error('Erro ao carregar departamentos:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.cadastroForm.invalid) {
      return;
    }

    const colaborador: Colaborador = {
      ...this.cadastroForm.value,
      id: this.cadastroForm.value.id || this.generateUniqueId()
    };

    this.dbService.addColaborador(colaborador).subscribe(
      () => {
        this.successMessage = 'Cadastro realizado com sucesso! Redirecionando para login...';
        setTimeout(() => {
          this.irParaLogin();
        }, 1500); // 1.5 segundos de delay para a mensagem ser exibida
      },
      error => {
        console.error('Erro ao cadastrar colaborador:', error);
      }
    );
  }

  resetForm(): void {
    this.cadastroForm.reset({
      nome: '',
      email: '',
      senha: '',
      departamento: '',
      cargo: '',
      gestor: false
    });
  }

  // Método opcional para redirecionar ao login
  irParaLogin(): void {
    this.router.navigate(['/login']);
  }

  // Método para gerar um ID único
  private generateUniqueId(): number {
    return Math.floor(Math.random() * 10000); // Exemplo simples
  }
}

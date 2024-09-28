import { DbServiceService } from './../../services/db-service.service';
import { Component, OnInit } from '@angular/core';
import { Colaborador } from '../../Models/colaborador';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  }

  onSubmit(): void {
    if (this.cadastroForm.invalid) {
      return;
    }

    const colaborador: Colaborador = {
      ...this.cadastroForm.value,
      id: this.cadastroForm.value.id || 0
    };

    this.dbService.addColaborador(colaborador).subscribe(() => {
      this.successMessage = 'Cadastro realizado com sucesso!';
      setTimeout(() => {
        this.resetForm();
        this.successMessage = null;
      }, 1000);
    });
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
}

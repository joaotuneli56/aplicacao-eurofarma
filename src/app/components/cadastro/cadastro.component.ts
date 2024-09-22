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
      id: this.cadastroForm.value.id || 0 // Garante que o ID seja numérico
    };

    this.dbService.addColaborador(this.cadastroForm.value).subscribe(() => {
      this.successMessage = 'Cadastro realizado com sucesso!';
      setTimeout(() => {
        this.irParaLogin();
      }, 1000);
    });
  }

  irParaLogin(): void {
    this.router.navigate(['/login']);
  }
}

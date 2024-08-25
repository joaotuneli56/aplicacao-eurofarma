import { DbServiceService } from './../../services/db-service.service';
import { Component } from '@angular/core';
import { Colaborador } from '../../Models/colaborador';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router, private dbService: DbServiceService) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      departamento: ['', Validators.required],
      cargo: ['', Validators.required],
      gestor: [false, Validators.required]
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

    const novoColaborador: Colaborador = {
      id: 0, // Defina como necessário
      nome: this.f['nome'].value,
      email: this.f['email'].value,
      senha: this.f['senha'].value,
      departamento: this.f['departamento'].value,
      cargo: this.f['cargo'].value,
      gestor: this.f['gestor'].value
    };

    this.dbService.addColaborador(novoColaborador).subscribe(response => {
      this.submitted = false; // Resetar o estado do formulário após o cadastro bem-sucedido
      this.router.navigate(['/login']);
    }, error => {
      console.error('Erro ao cadastrar colaborador:', error);
    });
  }

  irParaLogin() {
    this.router.navigate(['/login']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbServiceService } from './../../services/db-service.service';
import { Colaborador } from '../../Models/colaborador';
import { CommonModule } from '@angular/common';
import { Curso } from '../../Models/curso';

@Component({
  selector: 'app-cadastrocurso',
  templateUrl: './cadastrocurso.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./cadastrocurso.component.css']
})
export class CadastroCursoComponent implements OnInit {
  cadastroCursoForm!: FormGroup;
  colaboradores: any[] = []; // Substitua pelo tipo correto do seu colaborador
  successMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dbService: DbServiceService
  ) {}

  ngOnInit(): void {
    this.cadastroCursoForm = this.formBuilder.group({
      cursoNome: ['', Validators.required],
      descricao: ['', Validators.required],
      colaboradores: [[]] // Inicializa com um array vazio para múltiplos IDs de colaboradores
    });

    this.getColaboradores();
  }

  getColaboradores(): void {
    this.dbService.getColaboradores().subscribe(data => {
      this.colaboradores = data;
    });
  }


  onSubmit(): void {
    if (this.cadastroCursoForm.invalid) {
      return;
    }

    // Montando o objeto do curso para envio
    const curso: Curso = {
      nome: this.cadastroCursoForm.value.cursoNome,
      descricao: this.cadastroCursoForm.value.descricao,
      colaboradoresAtribuidos: this.cadastroCursoForm.value.colaboradores, // IDs dos colaboradores selecionados
      id: this.cadastroCursoForm.value.id || this.generateUniqueId()
    };

    this.dbService.addCurso(curso).subscribe(() => {
      this.successMessage = 'Curso cadastrado com sucesso!';
      setTimeout(() => {
        this.voltarParaHome();
      }, 1000);
    });
  }
  private generateUniqueId(): number {
    return Math.floor(Math.random() * 10000); // Exemplo simples
  }

  voltarParaHome(): void {
    this.router.navigate(['/home-gestor']);
  }
}

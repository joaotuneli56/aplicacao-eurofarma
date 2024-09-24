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
      colaboradores: [[]] // Inicializa com um array vazio
    });

    // Chame um método para obter a lista de colaboradores
    this.getColaboradores();
  }

  getColaboradores(): void {
    this.dbService.getColaboradores().subscribe(data => {
      this.colaboradores = data;
    });
  }

  onCheckboxChange(event: any): void {
    const formArray: FormArray = this.cadastroCursoForm.get('colaboradores') as FormArray;

    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      const index = formArray.controls.findIndex(x => x.value === event.target.value);
      formArray.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.cadastroCursoForm.invalid) {
      return;
    }
    const cursos: Curso = {
      ...this.cadastroCursoForm.value,
      id: this.cadastroCursoForm.value.id || 0 // Garante que o ID seja numérico
    };

    this.dbService.addCurso(this.cadastroCursoForm.value).subscribe(() => {
      this.successMessage = 'Curso cadastrado com sucesso!';
      setTimeout(() => {
        this.voltarParaHome();
      }, 1000);
    });
  }

  voltarParaHome(): void {
    this.router.navigate(['/home-gestor']);
  }
}

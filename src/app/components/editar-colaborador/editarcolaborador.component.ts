import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbServiceService } from '../../services/db-service.service';
import { Colaborador } from '../../Models/colaborador';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-editarcolaborador',
  templateUrl: './editarcolaborador.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./editarcolaborador.component.css']
})
export class EditarColaboradorComponent implements OnInit {
  colaboradorForm!: FormGroup;
  colaboradorId!: number;


  constructor(
    private fb: FormBuilder,
    private dbService: DbServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.colaboradorId = +this.route.snapshot.paramMap.get('id')!;
    this.dbService.getColaboradorById(this.colaboradorId).subscribe(colaborador => {
      this.colaboradorForm = this.fb.group({
        nome: [colaborador.nome, Validators.required],
        email: [colaborador.email, [Validators.required, Validators.email]],
        departamento: [colaborador.departamento, Validators.required],
        cargo: [colaborador.cargo, Validators.required],
        gestor: [colaborador.gestor]
      });
    });
  }

  onSubmit(): void {
    if (this.colaboradorForm.valid) {
      const colaborador: Colaborador = { ...this.colaboradorForm.value, id: this.colaboradorId };
      this.dbService.updateColaborador(colaborador).subscribe(() => {
        this.router.navigate(['/lista-colaboradores-gestor']);
      });
    }
  }
  removerColaborador(): void {
    const confirmacao = confirm("Tem certeza que deseja remover este colaborador?");
    if (confirmacao) {
      this.dbService.deleteColaborador(this.colaboradorId).subscribe(() => {
        alert("Colaborador removido com sucesso!");
        this.router.navigate(['/home-gestor']);  // Redireciona após remover
      }, error => {
        console.error("Erro ao remover colaborador", error);
      });
    }
  }

}

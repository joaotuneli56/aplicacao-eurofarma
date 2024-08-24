import { DbServiceService } from './../../services/db-service.service';
import { Component } from '@angular/core';
import { Colaborador } from '../../Models/colaborador';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  novoColaborador: Colaborador = {
    id: 0,
    nome: '',
    email: '',
    senha: '',
    departamento: '',
    cargo: '',
    gestor: false
  };

  constructor(private DbServiceService: DbServiceService) { }

  onSubmit() {
    this.DbServiceService.addColaborador(this.novoColaborador).subscribe(
      (res) => {
        console.log('Colaborador cadastrado com sucesso!', res);
        // Redirecionar ou dar feedback ao usuário
      },
      (err) => {
        console.error('Erro ao cadastrar colaborador', err);
      }
    );
  }
}

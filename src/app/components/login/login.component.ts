import { Router } from '@angular/router';
import { DbServiceService } from './../../services/db-service.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router, private dbService: DbServiceService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  // Atualize o getter para usar notação de colchetes
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.dbService.getColaboradores().subscribe(colaboradores => {
      const user = colaboradores.find(
        u => u.email === this.f['email'].value && u.senha === this.f['senha'].value
      );

      if (user) {
        this.router.navigate(['/homepage']);
      } else {
        console.error('Email ou senha inválidos');
      }
    });
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }
}

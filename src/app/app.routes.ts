import { Routes } from '@angular/router';
import { ListagemComercialComponent } from './components/listagem-comercial/listagem-comercial.component';
import { ListagemRHComponent } from './components/listagem-rh/listagem-rh.component';
import { ListagemTIComponent } from './components/listagem-ti/listagem-ti.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'listagem-ti', component: ListagemTIComponent },
  { path: 'listagem-rh', component: ListagemRHComponent },
  { path: 'listagem-comercial', component: ListagemComercialComponent },
  { path: '**', redirectTo: '/login' } // Redireciona para a página de login em caso de rota não encontrada
];

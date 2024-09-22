import { Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { HomeGestorComponent } from './components/homegestor/homegestor.component';
import { HomeColaboradorComponent } from './components/homecolaborador/homecolaborador.component';
import { ListaColaboradoresFunComponent } from './components/lista-colaboradores-fun/listacolaboradoresfun.component';
import { ListaColaboradoresGestorComponent } from './components/lista-colaboradores-gestor/listacolaboradoresgestor.component';
import { EditarColaboradorComponent } from './components/editar-colaborador/editarcolaborador.component';
import { CadastroCursoComponent } from './components/cadastro-curso/cadastrocurso.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home-gestor', component: HomeGestorComponent },
  { path: 'home-colaborador', component: HomeColaboradorComponent },
  { path: 'lista-colaboradores-fun', component: ListaColaboradoresFunComponent },
  { path: 'lista-colaboradores-gestor', component: ListaColaboradoresGestorComponent },
  { path: 'editarcolaborador/:id', component: EditarColaboradorComponent },
  { path: 'cadastro-curso', component: CadastroCursoComponent },
  { path: '**', redirectTo: '/login' } // Redireciona para a página de login em caso de rota não encontrada
];

export interface Colaborador {
  id: number;
  nome: string;
  email: string;
  senha: string;
  departamento: string;
  cargo: string;
  gestor: boolean;
  cursosAtribuidos?: number[];  // IDs dos cursos atribuídos a este colaborador
}

# Passo a passo para testar a aplicação:

- [ ] 1° clonar o projeto

```
git clone https://github.com/joaotuneli56/aplicacao-eurofarma.git
```

- [ ] 2° Entrar na pasta aplicacao-eurofarma.

```
cd aplicacao-eurofarma
```

- [ ] 3° passo rodar o seguinte comando

```
npm install -g @angular/cli
```

- [ ] 4° passo rodar o seguinte comando

```
Set-ExecutionPolicy RemoteSigned
```

- [ ] 5° passo rodar o seguinte comando

```
npm install
```

- [ ] 6° abri um segundo terminal

- [ ] 7° instalar o pacote `json-server`

```
npm install -g json-server
```

- [ ] 8° rodar o servidor

```
json-server --watch db.json --port 3000
```

# Diagrama de Solução

Agente: **Usuário**

```mermaid
---
title: Diagrama de Solução
---
classDiagram
    note "Estrutura de componentes do sistema"
    
    GestorArea <|-- AutenticarGestor
    GestorArea <|-- EditarFuncionario
    GestorArea <|-- RemoverFuncionario
    GestorArea <|-- AdicionarFuncionario
    GestorArea <|-- LogarGestor
    
    AprendizadoArea <|-- ListagemColaboradores
    AprendizadoArea <|-- AutenticarColaborador
    AprendizadoArea <|-- LogarAprendizado

    class GestorArea {
        +autenticarGestor()
        +editarFuncionario()
        +removerFuncionario()
        +adicionarFuncionario()
        +logarGestor()
    }

    class AutenticarGestor{
        +validarCredenciais()
    }

    class EditarFuncionario{
        +modificarDadosFuncionario()
    }

    class RemoverFuncionario{
        +excluirFuncionario()
    }

    class AdicionarFuncionario{
        +incluirFuncionario()
    }

    class LogarGestor{
        +iniciarSessao()
    }

    class AprendizadoArea {
        +listarColaboradores()
        +autenticarColaborador()
        +logarAprendizado()
    }

    class ListagemColaboradores{
        +obterColaboradores()
    }

    class AutenticarColaborador{
        +validarCredenciaisColaborador()
    }

    class LogarAprendizado{
        +iniciarSessaoAprendizado()
    }


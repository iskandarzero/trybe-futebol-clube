# Projeto Trybe Futebol Clube

## Contexto

Nesse projeto desenvolvi o backend de uma aplicação que trazia informações sobre futebol. A aplicação conta com um login que checa com o banco de dados se a conta se trata de um admnistrador com permissões ou de um usuário comum, e nas suas rotas, é capaz de trazer informações de partidas finalizadas e em andamento, além de placares relacionados aos jogos.

## Rotas

### /login

```
  http://localhost:3000/login
```

<details>

  A rota login é do tipo POST e deve receber um corpo com o seguinte formato:
  
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
  
  A rota utiliza a bliblioteca `bcryptjs` para autenticar a senha com o banco de dados, e em caso de sucesso, retorna um token da biblioteca `jsonwebtoken` para permitir o acesso do ususário.

</details>

### /login/validate

```
  http://localhost:3001/login/validate
```

<!-- Olá, Tryber!

Esse é apenas um arquivo inicial para o README do seu projeto.

É essencial que você preencha esse documento por conta própria, ok?

Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!

⚠️ IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.

-->

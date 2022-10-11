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

<details>

  A rota GET é consumida pelo frontend para checar as permissões que o usuário tem baseadas em sua função. Ela deverá enviar uma resposta nesse formato:
  
  ```json
  { "role": "admin" }
  ```
  
</details>

### /teams

```
  http://localhost:3001/teams
```

<details>

  A rota GET retorna os nomes e ids e todos os times no seguinte formato:
  
  ```json
  [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  ...
]
  ```
  
</details>

# Projeto Trybe Futebol Clube :soccer:

## Contexto

Nesse projeto desenvolvi o backend de uma aplicação que trazia informações sobre futebol. A aplicação conta com um login que checa com o banco de dados se a conta se trata de um admnistrador com permissões ou de um usuário comum, e nas suas rotas é capaz de trazer informações de partidas finalizadas e em andamento, além de placares relacionados aos jogos.

## Tecnologias e ferramentas

![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Express](	https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![TS](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

## Instruções para uso

Instalar as dependências:

```bash
  npm install
```

Executar a aplicação:

```bash
  npm run compose:up 
```

Acesse no seguinte endereço:

```
  http://localhost:3000/
```

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

### /teams/:id

```
  http://localhost:3001/teams/7
```

<details>

  A rota GET retorna o nome e id de um time específico no seguinte formato:
  
  ```json
  {
    "id": 7,
    "teamName": "Flamengo"
  }
  ```
  
</details>

### /matches

```
  http://localhost:3001/matches
```

<details>

  A rota GET retorna as partidas nesse formato:
  
  ```json
  [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Grêmio"
      }
    },
    ...
    {
      "id": 41,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Internacional"
      }
    }
  ]
  ```
  
</details>

### /matches/:id/finish

```
  http://localhost:3001/matches/41/finish
```

<details>

  A rota PATCH possibilita alterar o status inProgress para finalizar uma partida. Ela traz a seguinte resposta: 
  
  ```json
    { "message": "Finished" }
  ```
  
</details>

### /matches/:id

```
  http://localhost:3001/matches/41
```

<details>

  A rota PATCH possibilita alterar os gols dos times da partida. Deve receber um corpo no seguinte formato: 
  
  ```json
    {
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    }
  ```
  
</details>

### /leaderboard/home

```
  http://localhost:3001/leaderboard/home
```

<details>

  A rota GET traz o placar dos times mandantes: 
  
  ```json
    [
      {
        "name": "Santos",
        "totalPoints": 9,
        "totalGames": 3,
        "totalVictories": 3,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 9,
        "goalsOwn": 3,
        "goalsBalance": 6,
        "efficiency": "100.00"
      },
      {
        "name": "Palmeiras",
        "totalPoints": 7,
        "totalGames": 3,
        "totalVictories": 2,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 10,
        "goalsOwn": 5,
        "goalsBalance": 5,
        "efficiency": "77.78"
      },
      ...
      {
        "name": "Bahia",
        "totalPoints": 0,
        "totalGames": 3,
        "totalVictories": 0,
        "totalDraws": 0,
        "totalLosses": 3,
        "goalsFavor": 0,
        "goalsOwn": 4,
        "goalsBalance": -4,
        "efficiency": "0.00"
      }
    ]
  ```
  
</details>

### /leaderboard/away

```
  http://localhost:3001/leaderboard/away
```

<details>

  A rota GET traz o placar dos times visitantes: 
  
  ```json
    [
      {
        "name": "Palmeiras",
        "totalPoints": 6,
        "totalGames": 2,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 7,
        "goalsOwn": 0,
        "goalsBalance": 7,
        "efficiency": "100.00"
      },
      {
        "name": "Corinthians",
        "totalPoints": 6,
        "totalGames": 3,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 6,
        "goalsOwn": 2,
        "goalsBalance": 4,
        "efficiency": "66.67"
      },
      ...
      {
        "name": "Napoli-SC",
        "totalPoints": 0,
        "totalGames": 3,
        "totalVictories": 0,
        "totalDraws": 0,
        "totalLosses": 3,
        "goalsFavor": 1,
        "goalsOwn": 10,
        "goalsBalance": -9,
        "efficiency": "0.00"
      }
    ]
  ```
  
</details>

### /leaderboard

```
  http://localhost:3001/leaderboard
```

<details>

  A rota GET traz o placar geral: 
  
  ```json
    [
      {
        "name": "Palmeiras",
        "totalPoints": 13,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 17,
        "goalsOwn": 5,
        "goalsBalance": 12,
        "efficiency": "86.67"
      },
      {
        "name": "Corinthians",
        "totalPoints": 12,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 12,
        "goalsOwn": 3,
        "goalsBalance": 9,
        "efficiency": "80.00"
      },
      ...
      {
        "name": "Napoli-SC",
        "totalPoints": 2,
        "totalGames": 5,
        "totalVictories": 0,
        "totalDraws": 2,
        "totalLosses": 3,
        "goalsFavor": 3,
        "goalsOwn": 12,
        "goalsBalance": -9,
        "efficiency": "13.33"
      }
    ]
  ```
  
</details>

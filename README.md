<p align="center">
Este projeto foi feito no desafio da AGSistemas. <br/>
</p>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>
</p>

<br>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- Express
- Nodejs
- Typescript
- Prisma
- PostgreSQL
- Zod
- Jest
- Supertest
- Nodemailer
- Bcryptjs
- JWT
- Docker

## 💻 Projeto

Neste projeto eu realizei o backend de uma plataforma para digitalizar e otimizar a gestão dos membros e suas interações em um um grupo de networking focado em geração de negócios.

---

## 🤔 Instruções

### Variáveis de Ambiente:

Para rodar o backend, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

- `PORT=` (por padrão esta na 3333)
- `DATABASE_URL="postgresql://[POSTGRESQL_USERNAME]:[POSTGRESQL_PASSWORD]@localhost:5432/[POSTGRESQL_DATABASE]?schema=public"`
- `JWT_SECRET=`
- `MEMBER_SECRET=`

E para rodar os testes, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env.testing

- `DATABASE_USER=`
- `DATABASE_PASS=`
- `DATABASE_HOST=`
- `DATABASE_PORT=`
- `DATABASE_NAME=`

### Primeiros passos:

Primeiramente certifique de baixar/clonar o arquivo backend no [GitHub](https://github.com/pdro-h0/desafio-backend). No seu terminal, execute o seguinte comando na raiz da pasta criada:

```console
npm install
```

E então rode o comando do [docker-compose](https://docs.docker.com/compose/):

```console
docker-compose up -d
```
ou
```console
docker compose up -d
```

Em seguida, rode:
```console
npx prisma generate
```
e
```console
npx prisma db push
```

rode o comando de seed. Este comando ira criar um membro admin com email: admin@example.com e senha admin123:

```console
npx prisma db seed
```

Por fim:

```console
npm run dev
```

---

### 🧪 Testes

- Para rodar os testes:

```console
npm run test
```

- Testes E2E:

```console
npm run test:e2e
```
- Coverage:

```console
npm run test:coverage
```

---

Feito com ♥ by Pedro Henrique

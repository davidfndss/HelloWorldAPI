

## Installation

```bash
$ npm install
```

## Set Up Enviroment Variables

Create a ```.env``` file in the root directory of the project and add the necessary environment variables. Here's an example of what it might look like:

```bash
PORT=PORT_OF_YOUR_CHOICE
DATABASE_URL=YOUR_MONGO_DB_ATLAS_URL
SECRET_JWT=GENERATE_WITH_SHA256
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_KEY=YOUR_SUPABASE_KEY
SUPABASE_BUCKET=YOUR_SUPABASE_BUCKET
```
there is a file named ```.env.example``` with this info.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Your API should now be running on http://localhost:3000 (or the port specified in your .env file).

## Accessing the API
Once the server is running, you can access the API endpoints using a tool like Postman or your browser. 
The API includes Swagger documentation, you can view it on:

```http://localhost:3000```

## Stack used on project:
![Nestjs](https://img.shields.io/badge/nestjs-purple?style=for-the-badge&logo=nestjs&logoColor=white)&nbsp;
![TypeScript](https://img.shields.io/badge/TypeScript-1572B6?style=for-the-badge&logo=typescript&logoColor=white)&nbsp;
![Prisma](https://img.shields.io/badge/Prisma-gray?style=for-the-badge&logo=prisma&logoColor=white)&nbsp;
![Node js](https://img.shields.io/badge/node.js-%234ea94b.svg?style=for-the-badge&logo=node.js&logoColor=white)&nbsp;
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)&nbsp;
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)&nbsp;
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Nestjs is a progressive Node.js framework for building efficient and scalable server-side applications.</p>

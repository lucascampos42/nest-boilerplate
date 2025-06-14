<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

In this initial version, I am considering basic parameters for a backend, which includes full authentication security for user login using JWT tokens.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Prisma**: An open-source database toolkit for TypeScript and Node.js.
- **Passport**: A popular Node.js library used to implement authentication.
- **Bun**: A fast JavaScript runtime like Node.js or Deno.
- **Bcrypt**: A library to help you hash passwords.
- **JWT**: JSON Web Tokens for securely transmitting information between parties.
- **Email Service**: For sending emails using SMTP.
 

## Installation

```bash
$ bun install
```

## Running the app

```bash
# development
$ bun run start

# watch mode
$ bun run start:dev

# production mode
$ bun run start:prod
```

```bash
## Environment Variables
The following environment variables are used in this project:

DATABASE_URL="your_database_url"
JWT_SECRET="your_jwt_secret"

EMAIL_LAYOUTS_DIR=templates
EMAIL_PARTIALS_DIR=templates/partials

LOGO_URL="your_logo_url"

EMAIL_HOST="your_email_host"
EMAIL_PORT=your_email_port
EMAIL_USER="your_email_user"
EMAIL_PASS="your_email_password"
```

## Stay in touch

- Author - [Lucas Campos](https://www.linkedin.com/in/lucas-ferreira-campos-12146997/)

## License

Nest is [MIT licensed](LICENSE).

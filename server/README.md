# 🔐 Authentication Server (NestJS)

This is the **backend authentication service** for the learning platform. It is built with **NestJS**, **TypeORM**, and **PostgreSQL**, and provides user registration, login, JWT-based authentication, refresh tokens, and role management.

---

## ✨ Features

* **User Authentication** (Register, Login, Logout)
* **JWT Access Tokens** with refresh token mechanism
* **Role-based access control** (`USER`, `MODERATOR`, `ADMIN`)
* **Password hashing** with `bcrypt`
* **Guards & Strategies** using `passport-local`, `passport-jwt`, and refresh strategy
* **Database integration** with PostgreSQL via TypeORM
* **Session tracking** (last login, active tokens)
* **Scalable module-based architecture** (Auth, User, Token)

---

## 🛠️ Tech Stack

* [NestJS](https://nestjs.com/) (v11)
* [TypeORM](https://typeorm.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [Passport.js](http://www.passportjs.org/)
* [JWT](https://jwt.io/)
* [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

---

## 🚀 Getting Started

### Prerequisites

* Node.js 22+
* npm or yarn
* PostgreSQL running locally or in Docker

### Installation

```bash
git clone https://github.com/lalkazaurus/educational-platform.git
cd server
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=learning_platform
JWT_SECRET=superSecretKey
```

---

### Running the Server

#### Development

```bash
npm run start:dev
```

#### Production

```bash
npm run build
npm run start:prod
```

Server runs by default on **[http://localhost:3000](http://localhost:3000)**

---

## 📡 API Endpoints

### Auth Routes

* `POST /auth/register` → Register new user `{ username, email, password }`
* `POST /auth/login` → Login with `{ email, password }`
* `DELETE /auth/logout` → Logout current user
* `POST /auth/refresh` → Refresh tokens
* `GET /auth/status` → Get current logged-in user

### User Entity

```ts
User {
  id: number;
  username: string;
  email: string;
  password: string;
  roles: Roles[]; // USER, MODERATOR, ADMIN
  status: Status; // ACTIVE, BANNED
  lastLogin: Date;
  tokens: Token[];
}
```

---

## 🗂️ Project Structure

```bash
src/
├── auth/              # Authentication module (controllers, services, guards, strategies)
│   ├── dto/           # DTOs for validation
│   ├── guards/        # Auth guards
│   ├── strategies/    # Passport strategies
│   └── auth.module.ts
├── token/             # Token management (refresh/access)
├── users/             # User module with entity, service, providers
├── database/          # Database configuration
├── app.module.ts      # Root module
├── main.ts            # Entry point
```

---

## 🧪 Testing

Unit and E2E tests with **Jest**:

```bash
npm run test
npm run test:e2e
```

---

## 📌 Notes

* Uses **JWT access tokens (15 min)** and **refresh tokens (30 days)**
* Tokens are hashed and stored in DB for validation
* Logout deletes tokens from DB (revocation)
* Role-based access can be extended with custom decorators and guards

---

✅ This authentication server is designed to be the **foundation** for the full learning platform backend.

# Online Store API

A small online store API built with NestJS, featuring JWT authentication, product management, and comprehensive test coverage.

[![pipeline status](https://gitlab.com/vasilev-aleksandr/online-store-app/badges/master/pipeline.svg)](https://gitlab.com/vasilev-aleksandr/online-store-app/-/commits/master)
[![coverage report](https://gitlab.com/vasilev-aleksandr/online-store-app/badges/master/coverage.svg)](https://gitlab.com/vasilev-aleksandr/online-store-app/-/commits/master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=online-store-app&metric=alert_status)](https://sonarcloud.io/dashboard?id=online-store-app)

## Features

- JWT-based authentication
- Product CRUD operations
- Input validation using class-validator
- Response transformation using class-transformer
- Global exception handling
- Environment-based configuration
- Graceful shutdown
- Comprehensive test coverage

## Prerequisites

- Node.js (v16 or later)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```bash
   # Application Configuration
   PORT=3000
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-key-change-in-production
   JWT_EXPIRES_IN=1d
   
   # Database Configuration (for future use)
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=postgres
   DATABASE_NAME=online_store
   
   # Node Environment
   NODE_ENV=development
   ```

## Running the Application

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

## Testing

### Unit Tests
```bash
npm run test
```

### Test Coverage
```bash
npm run test:cov
```

### E2E Tests
```bash
npm run test:e2e
```

## Linting and Formatting

### Check Linting
```bash
npm run lint:check
```

### Fix Linting Issues
```bash
npm run lint:fix
```

### Format Code
```bash
npm run format
```

### Check Formatting
```bash
npm run format:check
```

### Run All Checks
```bash
npm run check
```

## API Endpoints

### Authentication
- POST /auth/login - Login with username and password
- POST /auth/register - Register a new user

### Products
- GET /products - Get all products
- GET /products/:id - Get a specific product
- POST /products - Create a new product (requires authentication)
- PUT /products/:id - Update a product (requires authentication)
- DELETE /products/:id - Delete a product (requires authentication)

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| PORT | Application port | 3000 | No |
| JWT_SECRET | JWT signing secret | super-secret-key | Yes |
| JWT_EXPIRES_IN | JWT expiration time | 1d | No |
| DATABASE_HOST | Database host | localhost | No |
| DATABASE_PORT | Database port | 5432 | No |
| DATABASE_USER | Database username | postgres | No |
| DATABASE_PASSWORD | Database password | postgres | No |
| DATABASE_NAME | Database name | online_store | No |
| NODE_ENV | Node environment | development | No |

## Project Structure

```
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   └── strategies/
│       └── jwt.strategy.ts
├── common/
│   └── filters/
│       └── http-exception.filter.ts
├── config/
│   └── configuration.ts
├── products/
│   ├── entities/
│   │   └── product.entity.ts
│   ├── products.controller.ts
│   ├── products.module.ts
│   ├── products.service.ts
│   └── products.service.spec.ts
├── users/
│   ├── entities/
│   │   └── user.entity.ts
│   ├── users.module.ts
│   └── users.service.ts
├── app.module.ts
└── main.ts
```

## Implementation Details

### JWT Authentication
- Uses Passport.js with JWT strategy
- JWT tokens are signed with a configurable secret
- Token expiration is configurable
- All product endpoints are protected with JwtAuthGuard

### Validation
- Uses class-validator decorators for input validation
- Global validation pipe with whitelist and transformation
- Custom validation rules for products and users

### Exception Handling
- Global HttpExceptionFilter for consistent error responses
- Handles both HTTP and generic errors
- Provides structured error responses with timestamps

### Configuration
- Uses ConfigModule for environment variable management
- Supports different environments
- Type-safe configuration access

### Testing
- Comprehensive unit tests for all services
- Test coverage tracking
- Jest as the testing framework
- Mocked dependencies for isolated testing

### Linting and Code Quality
- ESLint configuration with TypeScript support
- Prettier for code formatting
- Comprehensive rules for code quality
- Separate rules for test files and entry points

## Example Usage

### Register a new user
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### Create a product (with JWT token)
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Test Product",
    "description": "A test product",
    "price": 99.99,
    "stock": 10
  }'
```

## License

This project is licensed under the MIT License.

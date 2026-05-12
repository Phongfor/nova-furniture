# NovaFurniture – Project Context

## Mô tả
E-Commerce backend bán đồ nội thất hiện đại.
Mục tiêu: Java Backend Intern/Fresher Portfolio 2026.

---

## Tech Stack
- Java 21
- Spring Boot 3.4.5
- Spring Security + JWT (jjwt 0.12.6)
- Spring Data JPA + Hibernate
- PostgreSQL 16 (Docker)
- Flyway (migration)
- Redis (Docker)
- Lombok
- MapStruct 1.6.3
- Swagger / OpenAPI (springdoc 2.8.8)
- Google OAuth2

---

## Package Structure
src/main/java/com/novafurniture/NovaFurniture/
├── common/response/ApiResponse.java
├── config/
│   ├── AppConfig.java
│   ├── CorsConfig.java
│   ├── RedisConfig.java
│   ├── SecurityConfig.java
│   └── SwaggerConfig.java
├── controller/
│   ├── AuthController.java
│   ├── BrandController.java
│   ├── CategoryController.java
│   ├── ProductController.java
│   └── UserController.java
├── dto/
│   ├── request/
│   │   ├── BrandRequest.java
│   │   ├── CategoryRequest.java
│   │   ├── LoginRequest.java
│   │   ├── OAuth2TokenRequest.java
│   │   ├── ProductRequest.java
│   │   ├── RefreshTokenRequest.java
│   │   └── RegisterRequest.java
│   └── response/
│       ├── AuthResponse.java
│       ├── BrandResponse.java
│       ├── CategoryResponse.java
│       ├── PageResponse.java
│       ├── ProductResponse.java
│       └── UserResponse.java
├── entity/
│   ├── Brand.java
│   ├── Category.java
│   ├── Product.java
│   └── User.java
├── enums/
│   └── Role.java (USER, ADMIN, STAFF)
├── exception/
│   ├── AppException.java
│   ├── ErrorCode.java
│   └── GlobalExceptionHandler.java
├── repository/
│   ├── BrandRepository.java
│   ├── CategoryRepository.java
│   ├── ProductRepository.java
│   └── UserRepository.java
├── security/
│   ├── CustomUserDetailsService.java
│   ├── JwtFilter.java
│   └── OAuth2SuccessHandler.java
├── service/
│   ├── AuthService.java
│   ├── BrandService.java
│   ├── CategoryService.java
│   ├── ProductService.java
│   ├── RedisService.java
│   ├── UserService.java
│   └── impl/
│       ├── AuthServiceImpl.java
│       ├── BrandServiceImpl.java
│       ├── CategoryServiceImpl.java
│       ├── ProductServiceImpl.java
│       └── UserServiceImpl.java
├── util/
│   └── JwtUtil.java
└── NovaFurnitureApplication.java

---

## Flyway Migrations
- V1__init_schema.sql — bảng users
- V2__create_categories_table.sql — bảng categories
- V3__create_brands_table.sql — bảng brands
- V4__create_products_table.sql — bảng products

---

## ErrorCode hiện tại
UNCATEGORIZED_EXCEPTION(9999) — 500
USER_NOT_FOUND(1101)          — 404
USER_ALREADY_EXISTS(1102)     — 409
UNAUTHENTICATED(1201)         — 401
UNAUTHORIZED(1202)            — 403
INVALID_CREDENTIALS(1203)     — 401
INVALID_TOKEN(1204)           — 401
PRODUCT_NOT_FOUND(2001)       — 404
CATEGORY_NOT_FOUND(2002)      — 404
BRAND_NOT_FOUND(2003)         — 404
CATEGORY_HAS_CHILDREN(2004)   — 400
ORDER_NOT_FOUND(3001)         — 404

---

## API hiện tại
Auth
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
GET  /api/v1/auth/me
POST /api/v1/auth/oauth2/token
GET  /oauth2/authorization/google
User
GET  /api/v1/users
GET  /api/v1/users/{id}
Category
GET    /api/v1/categories
GET    /api/v1/categories/{id}
POST   /api/v1/categories
PUT    /api/v1/categories/{id}
DELETE /api/v1/categories/{id}
Brand
GET    /api/v1/brands
GET    /api/v1/brands/{id}
POST   /api/v1/brands
PUT    /api/v1/brands/{id}
DELETE /api/v1/brands/{id}
Product
GET    /api/v1/products
GET    /api/v1/products/{id}
GET    /api/v1/products/slug/{slug}
POST   /api/v1/products
PUT    /api/v1/products/{id}
DELETE /api/v1/products/{id}

---

## Docker
- PostgreSQL: nova_postgres (port 5432)
- Redis: nova_redis (port 6379)
- Chạy: `docker compose up -d`
- Dừng: `docker compose down`

---

## Git Flow
- `main` ← code setup ban đầu
- `develop` ← code đang phát triển
- `feature/` ← từng tính năng

---

## Trạng thái hiện tại
- [x] Project setup
- [x] Docker (PostgreSQL + Redis)
- [x] Flyway Migration (V1-V4)
- [x] Exception Handling + Validation
- [x] Security Config + CORS + Swagger
- [x] JWT (JwtUtil, JwtFilter, CustomUserDetailsService)
- [x] Auth Module (register, login, refresh, logout, me, Google OAuth2)
- [x] User Module
- [x] Category Module
- [x] Brand Module
- [x] Product Module (CRUD, pagination, filter, search)
- [x] Redis (one-time code cho Google OAuth2)
- [ ] Cart Module
- [ ] Order Module
- [ ] Payment Module
- [ ] Review + Wishlist
- [ ] Admin Dashboard
- [ ] Redis Cache cho Product
- [ ] Role-based Authorization

---

## Roadmap tiếp theo
Bước 1-12: Done ✅
Bước 13: Cart Module
Bước 14: Order Module
Bước 15: Payment Module
Bước 16: Review + Wishlist
Bước 17: Redis Cache
Bước 18: Role-based Authorization
Bước 19: Admin Dashboard

---

## Quy tắc làm việc
- Đi từng bước nhỏ, xong bước nào confirm rồi mới qua bước tiếp
- IDE: IntelliJ IDEA — OS: Windows
- Test API bằng Swagger UI + Postman
- Mỗi feature tạo nhánh riêng, merge vào develop qua Pull Request
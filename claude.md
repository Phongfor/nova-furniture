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
- PostgreSQL 16 (chạy qua Docker)
- Flyway (migration)
- Lombok
- MapStruct 1.6.3
- Swagger / OpenAPI (springdoc 2.8.8)
- Redis — chưa implement

---

## Cấu trúc project
src/main/java/com/novafurniture/NovaFurniture/
├── common/
│   └── response/ApiResponse.java
├── config/
│   └── SecurityConfig.java
├── controller/
│   ├── AuthController.java
│   └── UserController.java
├── dto/
│   ├── request/
│   │   ├── LoginRequest.java
│   │   └── RegisterRequest.java
│   └── response/
│       ├── AuthResponse.java
│       └── UserResponse.java
├── entity/
│   └── User.java
├── enums/
│   └── Role.java
├── exception/
│   ├── AppException.java
│   ├── ErrorCode.java
│   └── GlobalExceptionHandler.java
├── repository/
│   └── UserRepository.java
├── security/
│   ├── CustomUserDetailsService.java
│   └── JwtFilter.java
├── service/
│   ├── AuthService.java
│   ├── UserService.java
│   └── impl/
│       ├── AuthServiceImpl.java
│       └── UserServiceImpl.java
├── util/
│   └── JwtUtil.java
├── validator/
└── NovaFurnitureApplication.java
src/main/resources/
├── db/migration/
│   └── V1__init_schema.sql
└── application.yaml

---

## application.yaml hiện tại
```yaml
spring:
  application:
    name: nova-furniture
  datasource:
    url: jdbc:postgresql://localhost:5432/nova_furniture
    username: postgres
    password: postgres
    driver-class-name: org.postgresql.Driver
  jpa:
    open-in-view: false
    hibernate:
      ddl-auto: validate
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.PostgreSQLDialect
  flyway:
    enabled: true
    locations: classpath:db/migration
    baseline-on-migrate: true
server:
  port: 8080
jwt:
  secret-key: 404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
  access-token-expiration: 900000
  refresh-token-expiration: 604800000
springdoc:
  swagger-ui:
    path: /swagger-ui/index.html
  api-docs:
    path: /api-docs
```

---

## Docker
- `docker-compose.yml` ở root project
- Chỉ có PostgreSQL (Redis chưa thêm)
- Chạy: `docker compose up -d`
- Dừng: `docker compose down`
- Container: `nova_postgres`

---

## Git Flow
- `main`     ← code setup ban đầu
- `develop`  ← code đang phát triển
- `feature/` ← từng tính năng

Quy trình:
1. `git checkout develop && git pull origin develop`
2. `git checkout -b feature/ten-tinh-nang`
3. Code xong: `git add . && git commit -m "feat: ..." && git push`
4. Tạo Pull Request trên GitHub merge vào `develop`

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
ORDER_NOT_FOUND(3001)         — 404

---

## API hiện tại
POST /api/v1/auth/register   — đăng ký (public)
POST /api/v1/auth/login      — đăng nhập (public)
GET  /api/v1/users           — lấy tất cả users (cần token)
GET  /api/v1/users/{id}      — lấy user theo id (cần token)

---

## Security Config
- Public: `/api/v1/auth/**`, `/swagger-ui/**`, `/api-docs/**`, `/v3/api-docs/**`
- Còn lại: cần Bearer Token
- Stateless, BCrypt password encoder

---

## Flyway Migration
- V1__init_schema.sql — tạo bảng `users`

---

## Trạng thái hiện tại
- [x] Tạo project Spring Boot 3.4.5
- [x] Sửa pom.xml (đúng dependencies)
- [x] Tạo application.yaml
- [x] Tạo docker-compose.yml (PostgreSQL)
- [x] Tạo Dockerfile
- [x] Tạo V1__init_schema.sql
- [x] App chạy được, kết nối PostgreSQL thành công
- [x] Entity User + Role enum
- [x] UserRepository
- [x] UserService + UserServiceImpl
- [x] UserController
- [x] ApiResponse wrapper
- [x] Exception Handling + Validation Handler
- [x] Security Config
- [x] JWT (JwtUtil, JwtFilter, CustomUserDetailsService)
- [x] AuthService + AuthController (register, login)
- [x] UserResponse DTO (ẩn password)
- [ ] Refresh Token
- [ ] Redis Cache + JWT Blacklist
- [ ] Product Module
- [ ] Category + Brand Module
- [ ] Cart + Order Module
- [ ] Payment Module
- [ ] Review + Wishlist
- [ ] Admin Dashboard

---

## Roadmap tiếp theo
Bước 11: Refresh Token
Bước 12: Product Module
Bước 13: Category + Brand
Bước 14: Cart + Order
Bước 15: Redis Cache
Bước 16: Payment
Bước 17: Review + Wishlist
Bước 18: Admin Dashboard

---

## Quy tắc làm việc
- Đi từng bước nhỏ, xong bước nào confirm rồi mới qua bước tiếp
- IDE: IntelliJ IDEA
- OS: Windows
- Test API bằng Postman và Swagger UI
- Mỗi feature tạo nhánh riêng, merge vào develop qua Pull Request
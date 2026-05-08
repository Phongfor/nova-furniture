# NovaFurniture – Project Context

## Mô tả
E-Commerce backend bán đồ nội thất hiện đại.
Mục tiêu: Java Backend Intern/Fresher Portfolio 2026.

---

## Tech Stack
- Java 21
- Spring Boot 3.4.5
- Spring Security (chưa config, đang dùng default)
- Spring Data JPA + Hibernate
- PostgreSQL 16 (chạy qua Docker)
- Flyway (migration)
- Lombok
- MapStruct 1.6.3
- Swagger / OpenAPI (springdoc 2.8.8)
- JWT (jjwt 0.12.6) — chưa implement
- Redis — chưa implement

---

## Cấu trúc project
```
src/main/java/com/example/NovaFurniture/
├── common/
├── config/
├── controller/
├── dto/
├── entity/
├── enums/
├── exception/
│   ├── AppException
│   ├── ErrorCode
│   └── GlobalExceptionHandler
├── respository/         ← lưu ý typo (repository)
├── service/
├── util/
├── validator/
└── NovaFurnitureApplication.java

src/main/resources/
├── db/migration/
│   └── V1__init_schema.sql   ← tạo bảng users
├── application.yml
static/
templates/
```

---

## Lưu ý quan trọng
- **groupId đang là `com.example`** — chưa đổi sang `com.novafurniture`
- Package `respository` bị typo — nên đổi thành `repository`
- `NovaFurnitureApplication` nằm trong package `com.example.NovaFurniture`

---

## application.yml hiện tại
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

## Flyway Migration
- V1__init_schema.sql — tạo bảng `users`

---

## Trạng thái hiện tại
- [x] Tạo project Spring Boot 3.4.5
- [x] Sửa pom.xml (đúng dependencies)
- [x] Tạo application.yml
- [x] Tạo docker-compose.yml (PostgreSQL)
- [x] Tạo Dockerfile (chưa dùng)
- [x] Tạo V1__init_schema.sql
- [x] App chạy được, kết nối PostgreSQL thành công
- [ ] Tạo Entity User
- [ ] Tạo Repository
- [ ] Tạo Service + Controller
- [ ] Exception Handling hoàn chỉnh
- [ ] JWT Authentication
- [ ] Redis Cache
- [ ] Các module: Product, Category, Brand, Cart, Order...

---

## Roadmap hiện tại
```
Bước 1: Chạy được app              ✅ Done
Bước 2: Entity User                ← đang ở đây
Bước 3: Repository + Service + API đầu tiên
Bước 4: Exception Handling
Bước 5: JWT Authentication
Bước 6: Redis Cache
Bước 7: Các module còn lại
```

---

## Quy tắc làm việc
- Đi từng bước nhỏ, xong bước nào confirm rồi mới qua bước tiếp
- Chưa cần JWT và Redis ở giai đoạn này
- IDE: IntelliJ IDEA
- OS: Windows
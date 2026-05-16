# NovaFurniture Backend API

<p align="center">
  <img src="https://img.shields.io/badge/Java-21-orange?style=flat-square&logo=java" />
  <img src="https://img.shields.io/badge/Spring Boot-3.4.5-brightgreen?style=flat-square&logo=springboot" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-blue?style=flat-square&logo=postgresql" />
  <img src="https://img.shields.io/badge/Redis-7-red?style=flat-square&logo=redis" />
  <img src="https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker" />
</p>

> RESTful API backend cho hệ thống thương mại điện tử bán đồ nội thất hiện đại.  
> Dự án portfolio Java Backend Intern/Fresher 2026.

---

## Mục lục

- [Tính năng](#tính-năng)
- [Tech Stack](#tech-stack)
- [Kiến trúc](#kiến-trúc)
- [Yêu cầu](#yêu-cầu)
- [Cài đặt & Chạy](#cài-đặt--chạy)
- [Cấu hình](#cấu-hình)
- [API Documentation](#api-documentation)
- [Phân quyền](#phân-quyền)
- [Database Schema](#database-schema)
- [Tác giả](#tác-giả)

---

## Tính năng

### Auth
- Đăng ký / Đăng nhập bằng email + password
- JWT Authentication (Access Token 15 phút + Refresh Token 7 ngày)
- Đăng nhập bằng Google OAuth2
- Logout với Redis blacklist (token hết hiệu lực ngay lập tức)

### Sản phẩm & Danh mục
- CRUD Products, Categories, Brands (chỉ ADMIN)
- Phân trang, tìm kiếm, lọc theo keyword/category/brand/material/color/price
- Redis Cache cho Product API (TTL 10-30 phút, tự động evict khi có thay đổi)
- Category hỗ trợ cây phân cấp (parent/sub category)

### Giỏ hàng
- Thêm/sửa/xóa sản phẩm trong giỏ
- Tự động gộp quantity nếu sản phẩm đã có trong giỏ
- Xóa toàn bộ giỏ hàng

### Đơn hàng
- Đặt hàng từ giỏ hàng, tự động clear cart sau khi đặt
- Snapshot giá sản phẩm tại thời điểm đặt hàng
- Xem, hủy đơn hàng (chỉ PENDING)
- ADMIN/STAFF cập nhật trạng thái: PENDING → CONFIRMED → SHIPPING → DELIVERED / CANCELLED

### Thanh toán
- Tích hợp VNPay Payment Gateway (Sandbox)
- Tạo link thanh toán, xử lý callback tự động
- Cập nhật trạng thái order sau khi thanh toán thành công

### Review & Wishlist
- Review sản phẩm (chỉ khi đã mua và được giao hàng)
- Rating 1-5 sao, xem điểm trung bình
- Wishlist toggle (add/remove)

### Admin Dashboard
- Tổng quan: số users, products, orders, doanh thu
- Doanh thu theo ngày (30 ngày) và theo tháng (12 tháng)
- Thống kê đơn hàng theo trạng thái
- Top sản phẩm bán chạy
- Danh sách users mới đăng ký

### Phân quyền
- 3 roles: USER, STAFF, ADMIN
- Spring Security + `@PreAuthorize`
- JSON response cho 401/403 (không redirect HTML)

---

## Tech Stack

| Công nghệ | Version | Mục đích |
|-----------|---------|----------|
| Java | 21 | Ngôn ngữ chính |
| Spring Boot | 3.4.5 | Framework |
| Spring Security | 6.4.5 | Authentication & Authorization |
| Spring Data JPA | 3.4.5 | ORM |
| Hibernate | 6.6.13 | JPA Implementation |
| PostgreSQL | 16 | Database chính |
| Flyway | 10.20.1 | Database migration |
| Redis | 7 | Cache + Token blacklist |
| JWT (jjwt) | 0.12.6 | Token-based auth |
| MapStruct | 1.6.3 | DTO mapping |
| Lombok | 1.18.38 | Boilerplate reduction |
| Springdoc OpenAPI | 2.8.8 | Swagger UI |
| Docker | - | Container |
| VNPay | Sandbox | Payment Gateway |
| Google OAuth2 | - | Social Login |

---

## Kiến trúc

```
┌─────────────────────────────────────────────────────┐
│                    Client                           │
│            (Postman / Swagger UI / FE)              │
└─────────────────────┬───────────────────────────────┘
                      │ HTTP Request
┌─────────────────────▼───────────────────────────────┐
│              Spring Security Filter Chain           │
│         JwtFilter → BlacklistCheck → Auth           │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│                  Controller Layer                   │
│   REST endpoints, request validation, response      │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│                  Service Layer                      │
│   Business logic, @Transactional, @Cacheable        │
└──────────┬──────────────────────┬───────────────────┘
           │                      │
┌──────────▼──────┐    ┌──────────▼──────────────────┐
│  Repository     │    │         Redis                │
│  (JPA/Hibernate)│    │  Cache + Blacklist + OAuth2  │
└──────────┬──────┘    └─────────────────────────────┘
           │
┌──────────▼──────┐
│   PostgreSQL    │
│   (Docker)      │
└─────────────────┘
```

---

## Yêu cầu

- **Java 21+**
- **Maven 3.8+**
- **Docker Desktop** (PostgreSQL + Redis)
- **ngrok** (nếu test VNPay payment)

---

## Cài đặt & Chạy

### 1. Clone repository

```bash
git clone https://github.com/your-username/nova-furniture.git
cd nova-furniture
```

### 2. Tạo file `.env`

Tạo file `.env` ở root project:

```env
# Database
DB_USERNAME=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET_KEY=your_very_long_secret_key_at_least_256_bits
JWT_ACCESS_EXPIRATION=900000
JWT_REFRESH_EXPIRATION=604800000

# Google OAuth2
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# VNPay Sandbox
VNPAY_TMN_CODE=your_tmn_code
VNPAY_HASH_SECRET=your_hash_secret
VNPAY_RETURN_URL=https://your-ngrok-url/api/v1/payments/vnpay/callback
```

### 3. Khởi động Docker

```bash
docker compose up -d
```

Kiểm tra containers:
```bash
docker ps
# nova_postgres (port 5432)
# nova_redis    (port 6379)
```

### 4. Cấu hình IntelliJ

Vào **Run/Debug Configurations** → thêm **EnvFile plugin** hoặc set Environment Variables thủ công từ file `.env`.

### 5. Chạy ứng dụng

```bash
mvn spring-boot:run
```

Hoặc chạy trực tiếp từ IntelliJ: **Run `NovaFurnitureApplication`**

### 6. Kiểm tra

- **Swagger UI:** http://localhost:8080/swagger-ui/index.html
- **API Docs:** http://localhost:8080/api-docs

---

## Cấu hình

### Database Migration

Flyway tự động chạy migrations khi khởi động:

| Version | File | Mô tả |
|---------|------|-------|
| V1 | `init_schema.sql` | Bảng users |
| V2 | `create_categories_table.sql` | Bảng categories |
| V3 | `create_brands_table.sql` | Bảng brands |
| V4 | `create_products_table.sql` | Bảng products |
| V5 | `create_cart_items_table.sql` | Bảng cart_items |
| V6 | `create_orders_table.sql` | Bảng orders + order_items |
| V7 | `create_reviews_wishlist_table.sql` | Bảng reviews + wishlist_items |
| V8 | `insert_admin_user.sql` | Tài khoản admin + staff mặc định |
| V9 | `create_payments_table.sql` | Bảng payments |

### Tài khoản mặc định

| Role | Email | Password |
|------|-------|----------|
| ADMIN | admin@novafurniture.com | Admin@123 |
| STAFF | staff@novafurniture.com | Staff@123 |

### VNPay (Test)

Thẻ test NCB:
```
Số thẻ:  9704198526191432198
Tên:     NGUYEN VAN A
Ngày PH: 07/15
OTP:     123456
```

---

## API Documentation

Sau khi chạy app, truy cập **http://localhost:8080/swagger-ui/index.html**

### Tóm tắt endpoints

```
Auth
  POST   /api/v1/auth/register
  POST   /api/v1/auth/login
  POST   /api/v1/auth/logout
  POST   /api/v1/auth/refresh
  GET    /api/v1/auth/me
  GET    /oauth2/authorization/google

User
  GET    /api/v1/users              [ADMIN, STAFF]
  GET    /api/v1/users/{id}

Product
  GET    /api/v1/products
  GET    /api/v1/products/{id}
  GET    /api/v1/products/slug/{slug}
  POST   /api/v1/products           [ADMIN]
  PUT    /api/v1/products/{id}      [ADMIN]
  DELETE /api/v1/products/{id}      [ADMIN]

Category & Brand
  GET/POST/PUT/DELETE /api/v1/categories  (POST/PUT/DELETE: ADMIN)
  GET/POST/PUT/DELETE /api/v1/brands      (POST/PUT/DELETE: ADMIN)

Cart
  GET    /api/v1/cart
  POST   /api/v1/cart/items
  PUT    /api/v1/cart/items/{id}
  DELETE /api/v1/cart/items/{id}
  DELETE /api/v1/cart

Order
  POST   /api/v1/orders
  GET    /api/v1/orders/my
  GET    /api/v1/orders/{id}
  PATCH  /api/v1/orders/{id}/cancel
  GET    /api/v1/orders              [ADMIN, STAFF]
  PATCH  /api/v1/orders/{id}/status  [ADMIN, STAFF]

Payment
  POST   /api/v1/payments/vnpay/create/{orderId}
  GET    /api/v1/payments/vnpay/callback
  GET    /api/v1/payments/order/{orderId}

Review
  GET    /api/v1/reviews/product/{productId}
  GET    /api/v1/reviews/product/{productId}/rating
  GET    /api/v1/reviews/my
  POST   /api/v1/reviews
  PATCH  /api/v1/reviews/{id}
  DELETE /api/v1/reviews/{id}

Wishlist
  GET    /api/v1/wishlist
  POST   /api/v1/wishlist/{productId}/toggle
  GET    /api/v1/wishlist/{productId}/check

Admin Dashboard  [ADMIN, STAFF]
  GET    /api/v1/admin/dashboard/summary
  GET    /api/v1/admin/dashboard/revenue/monthly
  GET    /api/v1/admin/dashboard/revenue/daily
  GET    /api/v1/admin/dashboard/orders/stats
  GET    /api/v1/admin/dashboard/products/top-selling
  GET    /api/v1/admin/dashboard/users/recent
```

---

## Phân quyền

| Chức năng | PUBLIC | USER | STAFF | ADMIN |
|-----------|:------:|:----:|:-----:|:-----:|
| Xem products/categories/brands | ✅ | ✅ | ✅ | ✅ |
| CRUD products/categories/brands | ❌ | ❌ | ❌ | ✅ |
| Xem all users | ❌ | ❌ | ✅ | ✅ |
| Xem profile của mình | ❌ | ✅ | ✅ | ✅ |
| Cart | ❌ | ✅ | ✅ | ✅ |
| Đặt hàng / Xem đơn của mình | ❌ | ✅ | ✅ | ✅ |
| Xem tất cả đơn hàng | ❌ | ❌ | ✅ | ✅ |
| Cập nhật trạng thái đơn hàng | ❌ | ❌ | ✅ | ✅ |
| Review / Wishlist | ❌ | ✅ | ✅ | ✅ |
| Thanh toán VNPay | ❌ | ✅ | ✅ | ✅ |
| Admin Dashboard | ❌ | ❌ | ✅ | ✅ |

---

## Database Schema

```
users
  └── cart_items (user_id → users.id)
  └── orders     (user_id → users.id)
  └── reviews    (user_id → users.id)
  └── wishlist_items (user_id → users.id)
  └── payments   (qua orders)

categories (tự tham chiếu: parent_id → categories.id)

brands

products
  ├── brand_id    → brands.id
  ├── category_id → categories.id
  └── (được tham chiếu bởi cart_items, order_items, reviews, wishlist_items)

orders
  └── order_items (order_id → orders.id)
  └── payments    (order_id → orders.id)
```

---

## Git Flow

```
main        ← initial setup
develop     ← tích hợp các features
feature/*   ← mỗi tính năng một nhánh

Ví dụ:
feature/cart-module
feature/order-module
feature/payment-vnpay
feature/redis-cache
feature/role-based-auth
feature/admin-dashboard
feature/review-wishlist
```

---

## Tác giả

**Hoàng Phong**
- GitHub: [@your-username](https://github.com/your-username)
- Email: hoangphong2725@gmail.com

---

<p align="center">Made with ❤️ for Java Backend Portfolio 2026</p>
```

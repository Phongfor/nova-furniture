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
│   ├── CustomUserDetails.java
│   ├── CustomUserDetailsService.java
│   ├── JwtFilter.java
│   ├── RedisConfig.java
│   ├── SecurityConfig.java
│   └── SwaggerConfig.java
├── controller/
│   ├── AuthController.java
│   ├── BrandController.java
│   ├── CartController.java
│   ├── CategoryController.java
│   ├── OrderController.java
│   ├── ProductController.java
│   ├── ReviewController.java
│   ├── UserController.java
│   └── WishlistController.java
├── dto/
│   ├── request/
│   │   ├── AddToCartRequest.java
│   │   ├── BrandRequest.java
│   │   ├── CategoryRequest.java
│   │   ├── LoginRequest.java
│   │   ├── OAuth2TokenRequest.java
│   │   ├── PlaceOrderRequest.java
│   │   ├── ProductRequest.java
│   │   ├── RefreshTokenRequest.java
│   │   ├── RegisterRequest.java
│   │   ├── ReviewRequest.java
│   │   ├── UpdateCartItemRequest.java
│   │   ├── UpdateOrderStatusRequest.java
│   │   └── UpdateReviewRequest.java
│   └── response/
│       ├── AuthResponse.java
│       ├── BrandResponse.java
│       ├── CartItemResponse.java
│       ├── CartResponse.java
│       ├── CategoryResponse.java
│       ├── OrderItemResponse.java
│       ├── OrderResponse.java
│       ├── PageResponse.java
│       ├── ProductResponse.java
│       ├── ReviewResponse.java
│       ├── UserResponse.java
│       └── WishlistItemResponse.java
├── entity/
│   ├── Brand.java
│   ├── CartItem.java
│   ├── Category.java
│   ├── Order.java
│   ├── OrderItem.java
│   ├── Product.java
│   ├── Review.java
│   ├── User.java
│   └── WishlistItem.java
├── enums/
│   ├── OrderStatus.java (PENDING, CONFIRMED, SHIPPING, DELIVERED, CANCELLED)
│   └── Role.java (USER, ADMIN, STAFF)
├── exception/
│   ├── AppException.java
│   ├── ErrorCode.java
│   └── GlobalExceptionHandler.java
├── mapper/
│   ├── CartItemMapper.java
│   ├── OrderMapper.java
│   ├── ReviewMapper.java
│   └── WishlistMapper.java
├── repository/
│   ├── BrandRepository.java
│   ├── CartItemRepository.java
│   ├── CategoryRepository.java
│   ├── OrderRepository.java
│   ├── ProductRepository.java
│   ├── ReviewRepository.java
│   ├── UserRepository.java
│   └── WishlistRepository.java
├── security/
│   └── OAuth2SuccessHandler.java
├── service/
│   ├── AuthService.java
│   ├── BrandService.java
│   ├── CartService.java
│   ├── CategoryService.java
│   ├── OrderService.java
│   ├── ProductService.java
│   ├── RedisService.java
│   ├── ReviewService.java
│   ├── UserService.java
│   ├── WishlistService.java
│   └── impl/
│       ├── AuthServiceImpl.java
│       ├── BrandServiceImpl.java
│       ├── CartServiceImpl.java
│       ├── CategoryServiceImpl.java
│       ├── OrderServiceImpl.java
│       ├── ProductServiceImpl.java
│       ├── ReviewServiceImpl.java
│       ├── UserServiceImpl.java
│       └── WishlistServiceImpl.java
├── util/
│   └── JwtUtil.java
└── NovaFurnitureApplication.java

---

## Flyway Migrations
- V1__init_schema.sql — bảng users
- V2__create_categories_table.sql — bảng categories
- V3__create_brands_table.sql — bảng brands
- V4__create_products_table.sql — bảng products
- V5__create_cart_items_table.sql — bảng cart_items
- V6__create_orders_table.sql — bảng orders + order_items
- V7__create_reviews_wishlist_table.sql — bảng reviews + wishlist_items

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
ORDER_CANNOT_CANCEL(3002)     — 400
CART_ITEM_NOT_FOUND(4001)     — 404
CART_ITEM_ALREADY_EXISTS(4002)— 409
INSUFFICIENT_STOCK(4003)      — 400
CART_EMPTY(4004)              — 400
REVIEW_NOT_FOUND(5001)        — 404
REVIEW_ALREADY_EXISTS(5002)   — 409
REVIEW_NOT_PURCHASED(5003)    — 400
WISHLIST_ITEM_NOT_FOUND(5004) — 404

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
GET/POST/PUT/DELETE /api/v1/categories
GET /api/v1/categories/{id}

Brand
GET/POST/PUT/DELETE /api/v1/brands
GET /api/v1/brands/{id}

Product
GET/POST/PUT/DELETE /api/v1/products
GET /api/v1/products/{id}
GET /api/v1/products/slug/{slug}

Cart
GET    /api/v1/cart
POST   /api/v1/cart/items
PUT    /api/v1/cart/items/{cartItemId}
DELETE /api/v1/cart/items/{cartItemId}
DELETE /api/v1/cart

Order
POST   /api/v1/orders
GET    /api/v1/orders/my
GET    /api/v1/orders/{orderId}
PATCH  /api/v1/orders/{orderId}/cancel
GET    /api/v1/orders                    [ADMIN]
PATCH  /api/v1/orders/{orderId}/status   [ADMIN]

Review
GET    /api/v1/reviews/product/{productId}
GET    /api/v1/reviews/product/{productId}/rating
GET    /api/v1/reviews/my
POST   /api/v1/reviews
PATCH  /api/v1/reviews/{reviewId}
DELETE /api/v1/reviews/{reviewId}

Wishlist
GET    /api/v1/wishlist
POST   /api/v1/wishlist/{productId}/toggle
GET    /api/v1/wishlist/{productId}/check

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
- [x] Flyway Migration (V1-V7)
- [x] Exception Handling + Validation
- [x] Security Config + CORS + Swagger
- [x] JWT (JwtUtil, JwtFilter, CustomUserDetails, CustomUserDetailsService)
- [x] Auth Module (register, login, refresh, logout, me, Google OAuth2)
- [x] User Module
- [x] Category Module
- [x] Brand Module
- [x] Product Module (CRUD, pagination, filter, search)
- [x] Redis (blacklist + one-time code OAuth2)
- [x] Cart Module (add, update, remove, clear, get)
- [x] Order Module (place, get, cancel, admin update status)
- [x] Review Module (create, update/PATCH, delete, get by product, avg rating)
- [x] Wishlist Module (toggle add/remove, get, check)
- [ ] Redis Cache Product
- [ ] Role-based Authorization
- [ ] Payment Module
- [ ] Admin Dashboard

---

## Roadmap tiếp theo
Bước 13-16: Done ✅
Bước 17: Redis Cache Product
Bước 18: Role-based Authorization
Bước 19: Payment Module (VNPay)
Bước 20: Admin Dashboard

---

## Lưu ý kỹ thuật quan trọng
- Dùng `@Transactional(readOnly=true)` ở class level cho Service
- ProductRepository dùng `nativeQuery=true` để tránh lỗi PostgreSQL
- `.env` file không commit lên GitHub
- `application.yaml` (không phải `.yml`)
- IDE: IntelliJ IDEA Ultimate, OS: Windows
- Test: Swagger UI + Postman
- JwtFilter set principal là `CustomUserDetails` (không phải String email)
- ApiResponse có static method `success(T result)`
- WishlistService.toggleWishlist dùng `flush()` sau delete để tránh race condition
- Review chỉ cho phép tạo khi order có status DELIVERED
- Toggle wishlist: add nếu chưa có, remove nếu đã có — trả về `wishlisted: true/false`

## Quy tắc làm việc
- Đi từng bước nhỏ, xong bước nào confirm rồi mới qua bước tiếp
- IDE: IntelliJ IDEA — OS: Windows
- Test API bằng Swagger UI + Postman
- Mỗi feature tạo nhánh riêng, merge vào develop qua Pull Request
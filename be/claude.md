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
- VNPay Payment Gateway

---

## Package Structure
src/main/java/com/novafurniture/NovaFurniture/
├── common/
│   ├── CacheConstants.java
│   └── response/ApiResponse.java
├── config/
│   ├── AppConfig.java
│   ├── CorsConfig.java
│   ├── CustomUserDetails.java
│   ├── CustomUserDetailsService.java
│   ├── JwtFilter.java
│   ├── RedisConfig.java
│   ├── SecurityConfig.java
│   ├── SwaggerConfig.java
│   └── VNPayConfig.java
├── controller/
│   ├── AdminDashboardController.java
│   ├── AuthController.java
│   ├── BrandController.java
│   ├── CartController.java
│   ├── CategoryController.java
│   ├── OrderController.java
│   ├── PaymentController.java
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
│       ├── CreatePaymentResponse.java
│       ├── DashboardSummaryResponse.java
│       ├── OrderItemResponse.java
│       ├── OrderResponse.java
│       ├── OrderStatsResponse.java
│       ├── PageResponse.java
│       ├── PaymentResponse.java
│       ├── ProductResponse.java
│       ├── RevenueByPeriodResponse.java
│       ├── ReviewResponse.java
│       ├── TopSellingProductResponse.java
│       ├── UserResponse.java
│       └── WishlistItemResponse.java
├── entity/
│   ├── Brand.java
│   ├── CartItem.java
│   ├── Category.java
│   ├── Order.java
│   ├── OrderItem.java
│   ├── Payment.java
│   ├── Product.java
│   ├── Review.java
│   ├── User.java
│   └── WishlistItem.java
├── enums/
│   ├── OrderStatus.java (PENDING, CONFIRMED, SHIPPING, DELIVERED, CANCELLED)
│   ├── PaymentStatus.java (PENDING, SUCCESS, FAILED, REFUNDED)
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
│   ├── OrderItemRepository.java
│   ├── OrderRepository.java
│   ├── PaymentRepository.java
│   ├── ProductRepository.java
│   ├── ReviewRepository.java
│   ├── UserRepository.java
│   └── WishlistRepository.java
├── security/
│   └── OAuth2SuccessHandler.java
├── service/
│   ├── AdminDashboardService.java
│   ├── AuthService.java
│   ├── BrandService.java
│   ├── CartService.java
│   ├── CategoryService.java
│   ├── OrderService.java
│   ├── PaymentService.java
│   ├── ProductService.java
│   ├── RedisService.java
│   ├── ReviewService.java
│   ├── UserService.java
│   ├── WishlistService.java
│   └── impl/
│       ├── AdminDashboardServiceImpl.java
│       ├── AuthServiceImpl.java
│       ├── BrandServiceImpl.java
│       ├── CartServiceImpl.java
│       ├── CategoryServiceImpl.java
│       ├── OrderServiceImpl.java
│       ├── PaymentServiceImpl.java
│       ├── ProductServiceImpl.java
│       ├── ReviewServiceImpl.java
│       ├── UserServiceImpl.java
│       └── WishlistServiceImpl.java
├── util/
│   ├── JwtUtil.java
│   └── VNPayUtil.java
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
- V8__insert_admin_user.sql — insert admin + staff mặc định
- V9__create_payments_table.sql — bảng payments

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
PAYMENT_NOT_FOUND(6001)       — 404
PAYMENT_ALREADY_EXISTS(6002)  — 409
PAYMENT_INVALID_SIGNATURE(6003)— 400
ORDER_NOT_PENDING(6004)       — 400

---

## API hiện tại
Auth
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout        ← blacklist token vào Redis
GET  /api/v1/auth/me
POST /api/v1/auth/oauth2/token
GET  /oauth2/authorization/google

User
GET  /api/v1/users              [ADMIN, STAFF]
GET  /api/v1/users/{id}         [ADMIN, STAFF, hoặc chính user đó]

Category
GET/POST/PUT/DELETE /api/v1/categories   (POST/PUT/DELETE: ADMIN only)

Brand
GET/POST/PUT/DELETE /api/v1/brands       (POST/PUT/DELETE: ADMIN only)

Product
GET/POST/PUT/DELETE /api/v1/products     (POST/PUT/DELETE: ADMIN only)
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
GET    /api/v1/orders                    [ADMIN, STAFF]
PATCH  /api/v1/orders/{orderId}/status   [ADMIN, STAFF]

Review
GET    /api/v1/reviews/product/{productId}         (public)
GET    /api/v1/reviews/product/{productId}/rating  (public)
GET    /api/v1/reviews/my
POST   /api/v1/reviews
PATCH  /api/v1/reviews/{reviewId}
DELETE /api/v1/reviews/{reviewId}

Wishlist
GET    /api/v1/wishlist
POST   /api/v1/wishlist/{productId}/toggle
GET    /api/v1/wishlist/{productId}/check

Payment
POST   /api/v1/payments/vnpay/create/{orderId}   ← tạo link thanh toán
GET    /api/v1/payments/vnpay/callback            ← VNPay redirect về (public)
GET    /api/v1/payments/order/{orderId}           ← xem trạng thái thanh toán

Admin Dashboard [ADMIN, STAFF]
GET    /api/v1/admin/dashboard/summary
GET    /api/v1/admin/dashboard/revenue/monthly
GET    /api/v1/admin/dashboard/revenue/daily
GET    /api/v1/admin/dashboard/orders/stats
GET    /api/v1/admin/dashboard/products/top-selling
GET    /api/v1/admin/dashboard/users/recent

---

## Phân quyền
| API | PUBLIC | USER | STAFF | ADMIN |
|-----|--------|------|-------|-------|
| GET products/categories/brands | ✅ | ✅ | ✅ | ✅ |
| POST/PUT/DELETE products/categories/brands | ❌ | ❌ | ❌ | ✅ |
| GET /users | ❌ | ❌ | ✅ | ✅ |
| GET /users/{id} (của mình) | ❌ | ✅ | ✅ | ✅ |
| GET /users/{id} (người khác) | ❌ | ❌ | ✅ | ✅ |
| Cart | ❌ | ✅ | ✅ | ✅ |
| POST/GET/PATCH/DELETE orders (của mình) | ❌ | ✅ | ✅ | ✅ |
| GET /orders (all) | ❌ | ❌ | ✅ | ✅ |
| PATCH /orders/{id}/status | ❌ | ❌ | ✅ | ✅ |
| Review/Wishlist | ❌ | ✅ | ✅ | ✅ |
| Payment (tạo + xem) | ❌ | ✅ | ✅ | ✅ |
| Admin Dashboard | ❌ | ❌ | ✅ | ✅ |

---

## Trạng thái hiện tại
- [x] Project setup
- [x] Docker (PostgreSQL + Redis)
- [x] Flyway Migration (V1-V9)
- [x] Exception Handling + Validation
- [x] Security Config + CORS + Swagger
- [x] JWT (JwtUtil, JwtFilter, CustomUserDetails, CustomUserDetailsService)
- [x] Auth Module (register, login, refresh, logout với Redis blacklist, me, Google OAuth2)
- [x] User Module
- [x] Category Module
- [x] Brand Module
- [x] Product Module (CRUD, pagination, filter, search)
- [x] Redis (blacklist logout + one-time code OAuth2 + cache product)
- [x] Cart Module (add, update, remove, clear, get)
- [x] Order Module (place, get, cancel, admin update status)
- [x] Review Module (create, update/PATCH, delete, get by product, avg rating)
- [x] Wishlist Module (toggle add/remove, get, check)
- [x] Redis Cache Product (@Cacheable, @CacheEvict)
- [x] Role-based Authorization (PUBLIC/USER/STAFF/ADMIN)
- [x] Admin Dashboard (summary, revenue, order stats, top selling, recent users)
- [x] Payment Module (VNPay Sandbox)
- [x] Logout với Redis blacklist
- [x] Env vars cho tất cả thông tin nhạy cảm

---

## Lưu ý kỹ thuật quan trọng
- `@Transactional(readOnly=true)` ở class level cho Service
- ProductRepository dùng `nativeQuery=true` để tránh lỗi PostgreSQL
- `.env` file không commit lên GitHub — thêm vào `.gitignore`
- `application.yaml` (không phải `.yml`)
- IDE: IntelliJ IDEA Ultimate, OS: Windows
- Test: Swagger UI + Postman
- JwtFilter set principal là `CustomUserDetails` (không phải String email)
- JwtFilter check blacklist Redis — trả về 401 trực tiếp (không gọi filterChain)
- ApiResponse có static method `success(T result)`
- RedisService dùng `StringRedisTemplate`
- RedisConfig có 2 beans: `redisTemplate<String,Object>` cho cache, `StringRedisTemplate` cho blacklist/OAuth2
- WishlistService.toggleWishlist dùng `flush()` sau delete
- Review chỉ tạo được khi order có status DELIVERED
- Toggle wishlist: add nếu chưa có, remove nếu đã có
- Logout blacklist token Redis với TTL = thời gian còn lại của token
- VNPay: IP phải là IPv4 (convert `::1` sang `127.0.0.1`)
- VNPay: hashData dùng raw value (không encode), queryString dùng URL encoded
- VNPay: callback URL phải dùng ngrok (không phải localhost)
- VNPay: ngrok free tier hiện warning page → nhấn "Visit Site" để tiếp tục
- Admin mặc định: admin@novafurniture.com / Admin@123
- Staff mặc định: staff@novafurniture.com / Staff@123
- exceptionHandling trong SecurityConfig trả về JSON cho 401/403
- `@EnableCaching` trên NovaFurnitureApplication
- `@EnableMethodSecurity` trên SecurityConfig để dùng `@PreAuthorize`

## Quy tắc làm việc
- Đi từng bước nhỏ, xong bước nào confirm rồi mới qua bước tiếp
- IDE: IntelliJ IDEA — OS: Windows
- Test API bằng Swagger UI + Postman
- Mỗi feature tạo nhánh riêng, merge vào develop qua Pull Request
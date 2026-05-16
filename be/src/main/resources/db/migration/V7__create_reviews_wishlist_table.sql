CREATE TABLE reviews (
                         id         BIGSERIAL PRIMARY KEY,
                         user_id    BIGINT      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                         product_id BIGINT      NOT NULL REFERENCES products(id) ON DELETE CASCADE,
                         rating     INT         NOT NULL CHECK (rating >= 1 AND rating <= 5),
                         comment    TEXT,
                         created_at TIMESTAMP   NOT NULL DEFAULT NOW(),
                         updated_at TIMESTAMP   NOT NULL DEFAULT NOW(),
                         CONSTRAINT uq_review_user_product UNIQUE (user_id, product_id)
);

CREATE TABLE wishlist_items (
                                id         BIGSERIAL PRIMARY KEY,
                                user_id    BIGINT      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                                product_id BIGINT      NOT NULL REFERENCES products(id) ON DELETE CASCADE,
                                created_at TIMESTAMP   NOT NULL DEFAULT NOW(),
                                CONSTRAINT uq_wishlist_user_product UNIQUE (user_id, product_id)
);
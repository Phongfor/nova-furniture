CREATE TABLE products
(
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(200) NOT NULL,
    slug        VARCHAR(200) NOT NULL UNIQUE,
    description TEXT,
    price       DECIMAL(15, 2) NOT NULL,
    stock       INTEGER        NOT NULL DEFAULT 0,
    material    VARCHAR(100),
    dimensions  VARCHAR(100),
    color       VARCHAR(50),
    weight      DECIMAL(8, 2),
    thumbnail   VARCHAR(500),
    brand_id    BIGINT REFERENCES brands (id),
    category_id BIGINT REFERENCES categories (id),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_slug ON products (slug);
CREATE INDEX idx_products_brand_id ON products (brand_id);
CREATE INDEX idx_products_category_id ON products (category_id);
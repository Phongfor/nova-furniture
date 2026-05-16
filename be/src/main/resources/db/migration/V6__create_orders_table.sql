CREATE TABLE orders (
                        id               BIGSERIAL PRIMARY KEY,
                        user_id          BIGINT          NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
                        status           VARCHAR(20)     NOT NULL DEFAULT 'PENDING',
                        shipping_address TEXT            NOT NULL,
                        recipient_name   VARCHAR(255)    NOT NULL,
                        recipient_phone  VARCHAR(20)     NOT NULL,
                        total_price      NUMERIC(15, 2)  NOT NULL,
                        note             TEXT,
                        created_at       TIMESTAMP       NOT NULL DEFAULT NOW(),
                        updated_at       TIMESTAMP       NOT NULL DEFAULT NOW()
);

CREATE TABLE order_items (
                             id                BIGSERIAL PRIMARY KEY,
                             order_id          BIGINT          NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
                             product_id        BIGINT,
                             product_name      VARCHAR(255)    NOT NULL,
                             product_thumbnail VARCHAR(500),
                             unit_price        NUMERIC(15, 2)  NOT NULL,
                             quantity          INT             NOT NULL CHECK (quantity > 0),
                             subtotal          NUMERIC(15, 2)  NOT NULL
);
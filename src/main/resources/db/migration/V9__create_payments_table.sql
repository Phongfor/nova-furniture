CREATE TABLE payments (
                          id                  BIGSERIAL PRIMARY KEY,
                          order_id            BIGINT          NOT NULL UNIQUE REFERENCES orders(id) ON DELETE RESTRICT,
                          vnp_txn_ref         VARCHAR(100)    NOT NULL UNIQUE,
                          vnp_transaction_no  VARCHAR(100),
                          vnp_bank_code       VARCHAR(20),
                          amount              NUMERIC(15, 2)  NOT NULL,
                          status              VARCHAR(20)     NOT NULL DEFAULT 'PENDING',
                          payment_url         TEXT,
                          paid_at             TIMESTAMP,
                          created_at          TIMESTAMP       NOT NULL DEFAULT NOW(),
                          updated_at          TIMESTAMP       NOT NULL DEFAULT NOW()
);
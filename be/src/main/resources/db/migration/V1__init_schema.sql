CREATE TABLE users
(
    id         BIGSERIAL PRIMARY KEY,
    fullname   VARCHAR(100) NOT NULL,
    email      VARCHAR(100) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    phone      VARCHAR(20),
    address    TEXT,
    avatar     VARCHAR(500),
    birthday   DATE,
    role       VARCHAR(20)  NOT NULL DEFAULT 'USER',
    enabled    BOOLEAN               DEFAULT TRUE,
    created_at TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP             DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users (email);
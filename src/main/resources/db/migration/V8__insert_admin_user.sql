-- Admin — password: Admin@123
INSERT INTO users (email, password, fullname, role, enabled, created_at, updated_at)
VALUES (
           'admin@novafurniture.com',
           '$2a$12$frNLOErRKZlj1aQpuuX63ea1H5dqiI.doYz.fxSa3ayLIGPXzGaGS',
           'Nova Admin',
           'ADMIN',
           true,
           NOW(),
           NOW()
       ) ON CONFLICT (email) DO NOTHING;

-- Staff — password: Staff@123
INSERT INTO users (email, password, fullname, role, enabled, created_at, updated_at)
VALUES (
           'staff@novafurniture.com',
           '$2a$12$s4iWaSaZoJL1yPKB6yQg8OTcdQ4E1X83GjY9IFzSu2j.rP.fk2fmG',
           'Nova Staff',
           'STAFF',
           true,
           NOW(),
           NOW()
       ) ON CONFLICT (email) DO NOTHING;
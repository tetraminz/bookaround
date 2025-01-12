-- USERS остаётся без изменений (по условию задачи).
CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       telegram_id BIGSERIAL UNIQUE NOT NULL,
                       username VARCHAR NOT NULL,
                       first_name VARCHAR NOT NULL,
                       last_name VARCHAR NOT NULL,
                       photo_url VARCHAR DEFAULT '',
                       language_code VARCHAR DEFAULT '',
                       is_bot BOOLEAN DEFAULT false,
                       allows_write_to_pm BOOLEAN DEFAULT false,
                       added_to_attachment_menu BOOLEAN DEFAULT false,
                       created_at timestamp with time zone default CURRENT_TIMESTAMP,
                       updated_at timestamp with time zone default CURRENT_TIMESTAMP
);

-- APPOINTMENT тоже остаётся как есть, но обращаем внимание, что ссылается на users(telegram_id).
CREATE TABLE appointment (
                             id BIGSERIAL PRIMARY KEY,
                             title VARCHAR NOT NULL,
                             description VARCHAR NOT NULL,
                             image_url VARCHAR NOT NULL,
                             price VARCHAR NOT NULL,
                             telegram_id BIGINT NOT NULL,
                             created_at timestamp with time zone default CURRENT_TIMESTAMP,
                             updated_at timestamp with time zone default CURRENT_TIMESTAMP,
                             CONSTRAINT fk_appointment_user FOREIGN KEY (telegram_id) REFERENCES users(telegram_id) ON DELETE CASCADE
);

-- Изменяем availability:
-- 1) Убираем PRIMARY KEY (weekday), добавляем композитный (telegram_id, weekday)
-- 2) Добавляем created_at и updated_at для отслеживания изменений (по желанию)
CREATE TABLE availability (
                              telegram_id BIGINT NOT NULL,
                              weekday SMALLINT NOT NULL,            -- Sunday=0, Monday=1, etc.
                              start_time TIME NULL,                 -- null => не работаю c ...
                              end_time TIME NULL,                   -- null => ... до ...
                              created_at timestamp with time zone default CURRENT_TIMESTAMP,
                              updated_at timestamp with time zone default CURRENT_TIMESTAMP,
                              PRIMARY KEY (telegram_id, weekday),
                              CONSTRAINT fk_availability_user
                                  FOREIGN KEY (telegram_id) REFERENCES users(telegram_id) ON DELETE CASCADE
);

-- booking: добавляем поля при вставке
CREATE TABLE booking (
                         id BIGSERIAL PRIMARY KEY,
                         start_time TIMESTAMP NOT NULL,
                         end_time TIMESTAMP NOT NULL,
                         email TEXT NOT NULL,
                         created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                         updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                         master_telegram_id BIGINT NOT NULL,
                         customer_telegram_id BIGINT NOT NULL,
                         appointment_id BIGINT NOT NULL,
                         CONSTRAINT fk_master_user
                             FOREIGN KEY (master_telegram_id) REFERENCES users(telegram_id) ON DELETE CASCADE,
                         CONSTRAINT fk_customer_user
                             FOREIGN KEY (customer_telegram_id) REFERENCES users(telegram_id) ON DELETE CASCADE,
                         CONSTRAINT fk_booking_appointment
                             FOREIGN KEY (appointment_id) REFERENCES appointment(id) ON DELETE CASCADE
);
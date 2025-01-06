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
                      added_to_attachment_menu BOOLEAN DEFAULT false
);
-- AVAILIBILITY


-- name: GetAvailability :many
SELECT * FROM availability
ORDER BY weekday;

-- name: UpdateAvailability :exec
INSERT INTO availability (weekday, start_time, end_time)
VALUES (@weekday, @start_time, @end_time)
ON CONFLICT (weekday) DO UPDATE
SET start_time = @start_time, end_time = @end_time;


-- BOOKING

-- name: InsertBooking :one
INSERT INTO booking (start_time, end_time, email)
VALUES ($1, $2, $3)
RETURNING *;

-- name: ListBookingsBetween :many
SELECT * FROM booking
WHERE start_time >= $1 AND end_time <= $2;

-- name: ListBookings :many
SELECT * FROM booking;

-- name: DeleteBooking :exec
DELETE FROM booking WHERE id = $1;


-- USERS

-- name: UpsertUser :one
INSERT INTO public.users (telegram_id, username, first_name, last_name, photo_url, language_code, is_bot, allows_write_to_pm, added_to_attachment_menu, created_at, updated_at)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, now(), now())
ON CONFLICT (id) DO UPDATE
    SET  telegram_id = excluded.telegram_id,
         username = excluded.username,
         first_name = excluded.first_name,
         last_name = excluded.last_name,
         photo_url = excluded.photo_url,
         language_code = excluded.language_code,
         is_bot = excluded.is_bot,
         allows_write_to_pm = excluded.allows_write_to_pm,
         added_to_attachment_menu = excluded.added_to_attachment_menu,
         updated_at = now()
RETURNING *;



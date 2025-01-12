
-- AVAILIBILITY

-- name: GetAvailabilityByUser :many
SELECT
    telegram_id,
    weekday,
    start_time,
    end_time,
    created_at,
    updated_at
FROM availability
WHERE telegram_id = $1
ORDER BY weekday;

-- name: UpsertAvailability :exec
INSERT INTO availability (telegram_id, weekday, start_time, end_time, updated_at)
VALUES ($1, $2, $3, $4, now())
ON CONFLICT (telegram_id, weekday)
    DO UPDATE
    SET start_time = EXCLUDED.start_time,
        end_time = EXCLUDED.end_time,
        updated_at = now();

-- name: DeleteAvailabilityByDay :exec
DELETE FROM availability
WHERE telegram_id = $1
  AND weekday = $2;

-- BOOKING

-- name: InsertBooking :one
INSERT INTO booking (
    start_time,
    end_time,
    email,
    master_telegram_id,
    customer_telegram_id,
    appointment_id,
    created_at,
    updated_at
)
VALUES ($1, $2, $3, $4, $5, $6, now(), now())
RETURNING *;

-- name: ListBookingsBetweenForMaster :many
SELECT *
FROM booking
WHERE master_telegram_id = $1
  AND start_time >= $2
  AND end_time <= $3
ORDER BY start_time ASC;

-- name: ListBookings :many
SELECT *
FROM booking
ORDER BY start_time DESC;

-- name: DeleteBooking :exec
DELETE FROM booking
WHERE id = $1;

-- USERS

-- name: UpsertUser :one
INSERT INTO public.users (
    telegram_id,
    username,
    first_name,
    last_name,
    photo_url,
    language_code,
    is_bot,
    allows_write_to_pm,
    added_to_attachment_menu,
    created_at,
    updated_at
)
VALUES (
           $1, $2, $3, $4, $5,
           $6, $7, $8, $9,
           now(),
           now()
       )
ON CONFLICT (telegram_id) DO UPDATE
    SET telegram_id = EXCLUDED.telegram_id,
        username = EXCLUDED.username,
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        photo_url = EXCLUDED.photo_url,
        language_code = EXCLUDED.language_code,
        is_bot = EXCLUDED.is_bot,
        allows_write_to_pm = EXCLUDED.allows_write_to_pm,
        added_to_attachment_menu = EXCLUDED.added_to_attachment_menu,
        updated_at = now()
RETURNING *;


-- APPOINTMENT

-- name: InsertAppointment :one
INSERT INTO appointment (
    title,
    description,
    image_url,
    price,
    telegram_id,
    created_at,
    updated_at
)
VALUES ($1, $2, $3, $4, $5, now(), now())
RETURNING *;

-- name: GetAppointmentById :one
SELECT *
FROM appointment
WHERE id = $1;

-- name: ListAppointments :many
SELECT *
FROM appointment
ORDER BY id DESC;

-- name: ListAppointmentsByUserName :many
SELECT
    a.id,
    a.title,
    a.description,
    a.image_url,
    a.price,
    a.telegram_id,
    a.created_at,
    a.updated_at
FROM appointment a
         JOIN users u ON a.telegram_id = u.telegram_id
WHERE u.username = $1
ORDER BY a.id DESC;

-- name: UpdateAppointment :exec
UPDATE appointment
SET
    title = $2,
    description = $3,
    image_url = $4,
    price = $5,
    telegram_id = $6,
    updated_at = now()
WHERE id = $1;

-- name: DeleteAppointment :exec
DELETE FROM appointment
WHERE id = $1;
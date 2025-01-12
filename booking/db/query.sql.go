// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: query.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const deleteAppointment = `-- name: DeleteAppointment :exec
DELETE FROM appointment
WHERE id = $1
`

func (q *Queries) DeleteAppointment(ctx context.Context, id int64) error {
	_, err := q.db.Exec(ctx, deleteAppointment, id)
	return err
}

const deleteAvailabilityByDay = `-- name: DeleteAvailabilityByDay :exec
DELETE FROM availability
WHERE telegram_id = $1
  AND weekday = $2
`

type DeleteAvailabilityByDayParams struct {
	TelegramID int64
	Weekday    int16
}

func (q *Queries) DeleteAvailabilityByDay(ctx context.Context, arg DeleteAvailabilityByDayParams) error {
	_, err := q.db.Exec(ctx, deleteAvailabilityByDay, arg.TelegramID, arg.Weekday)
	return err
}

const deleteBooking = `-- name: DeleteBooking :exec
DELETE FROM booking
WHERE id = $1
`

func (q *Queries) DeleteBooking(ctx context.Context, id int64) error {
	_, err := q.db.Exec(ctx, deleteBooking, id)
	return err
}

const getAppointmentById = `-- name: GetAppointmentById :one
SELECT id, title, description, image_url, price, telegram_id, created_at, updated_at
FROM appointment
WHERE id = $1
`

func (q *Queries) GetAppointmentById(ctx context.Context, id int64) (Appointment, error) {
	row := q.db.QueryRow(ctx, getAppointmentById, id)
	var i Appointment
	err := row.Scan(
		&i.ID,
		&i.Title,
		&i.Description,
		&i.ImageUrl,
		&i.Price,
		&i.TelegramID,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getAvailabilityByUser = `-- name: GetAvailabilityByUser :many

SELECT
    telegram_id,
    weekday,
    start_time,
    end_time,
    created_at,
    updated_at
FROM availability
WHERE telegram_id = $1
ORDER BY weekday
`

// AVAILIBILITY
func (q *Queries) GetAvailabilityByUser(ctx context.Context, telegramID int64) ([]Availability, error) {
	rows, err := q.db.Query(ctx, getAvailabilityByUser, telegramID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Availability
	for rows.Next() {
		var i Availability
		if err := rows.Scan(
			&i.TelegramID,
			&i.Weekday,
			&i.StartTime,
			&i.EndTime,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getUserByUsername = `-- name: GetUserByUsername :one
SELECT
    telegram_id,
    first_name,
    last_name,
    photo_url,
    language_code
FROM users
    WHERE username = $1
`

type GetUserByUsernameRow struct {
	TelegramID   int64
	FirstName    string
	LastName     string
	PhotoUrl     pgtype.Text
	LanguageCode pgtype.Text
}

func (q *Queries) GetUserByUsername(ctx context.Context, username string) (GetUserByUsernameRow, error) {
	row := q.db.QueryRow(ctx, getUserByUsername, username)
	var i GetUserByUsernameRow
	err := row.Scan(
		&i.TelegramID,
		&i.FirstName,
		&i.LastName,
		&i.PhotoUrl,
		&i.LanguageCode,
	)
	return i, err
}

const insertAppointment = `-- name: InsertAppointment :one

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
RETURNING id, title, description, image_url, price, telegram_id, created_at, updated_at
`

type InsertAppointmentParams struct {
	Title       string
	Description string
	ImageUrl    string
	Price       string
	TelegramID  int64
}

// APPOINTMENT
func (q *Queries) InsertAppointment(ctx context.Context, arg InsertAppointmentParams) (Appointment, error) {
	row := q.db.QueryRow(ctx, insertAppointment,
		arg.Title,
		arg.Description,
		arg.ImageUrl,
		arg.Price,
		arg.TelegramID,
	)
	var i Appointment
	err := row.Scan(
		&i.ID,
		&i.Title,
		&i.Description,
		&i.ImageUrl,
		&i.Price,
		&i.TelegramID,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const insertBooking = `-- name: InsertBooking :one

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
RETURNING id, start_time, end_time, email, created_at, updated_at, master_telegram_id, customer_telegram_id, appointment_id
`

type InsertBookingParams struct {
	StartTime          pgtype.Timestamp
	EndTime            pgtype.Timestamp
	Email              string
	MasterTelegramID   int64
	CustomerTelegramID int64
	AppointmentID      int64
}

// BOOKING
func (q *Queries) InsertBooking(ctx context.Context, arg InsertBookingParams) (Booking, error) {
	row := q.db.QueryRow(ctx, insertBooking,
		arg.StartTime,
		arg.EndTime,
		arg.Email,
		arg.MasterTelegramID,
		arg.CustomerTelegramID,
		arg.AppointmentID,
	)
	var i Booking
	err := row.Scan(
		&i.ID,
		&i.StartTime,
		&i.EndTime,
		&i.Email,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.MasterTelegramID,
		&i.CustomerTelegramID,
		&i.AppointmentID,
	)
	return i, err
}

const listAppointments = `-- name: ListAppointments :many
SELECT id, title, description, image_url, price, telegram_id, created_at, updated_at
FROM appointment
ORDER BY id DESC
`

func (q *Queries) ListAppointments(ctx context.Context) ([]Appointment, error) {
	rows, err := q.db.Query(ctx, listAppointments)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Appointment
	for rows.Next() {
		var i Appointment
		if err := rows.Scan(
			&i.ID,
			&i.Title,
			&i.Description,
			&i.ImageUrl,
			&i.Price,
			&i.TelegramID,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const listAppointmentsByUserName = `-- name: ListAppointmentsByUserName :many
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
ORDER BY a.id DESC
`

func (q *Queries) ListAppointmentsByUserName(ctx context.Context, username string) ([]Appointment, error) {
	rows, err := q.db.Query(ctx, listAppointmentsByUserName, username)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Appointment
	for rows.Next() {
		var i Appointment
		if err := rows.Scan(
			&i.ID,
			&i.Title,
			&i.Description,
			&i.ImageUrl,
			&i.Price,
			&i.TelegramID,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const listBookings = `-- name: ListBookings :many
SELECT id, start_time, end_time, email, created_at, updated_at, master_telegram_id, customer_telegram_id, appointment_id
FROM booking
ORDER BY start_time DESC
`

func (q *Queries) ListBookings(ctx context.Context) ([]Booking, error) {
	rows, err := q.db.Query(ctx, listBookings)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Booking
	for rows.Next() {
		var i Booking
		if err := rows.Scan(
			&i.ID,
			&i.StartTime,
			&i.EndTime,
			&i.Email,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.MasterTelegramID,
			&i.CustomerTelegramID,
			&i.AppointmentID,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const listBookingsBetweenForMaster = `-- name: ListBookingsBetweenForMaster :many
SELECT id, start_time, end_time, email, created_at, updated_at, master_telegram_id, customer_telegram_id, appointment_id
FROM booking
WHERE master_telegram_id = $1
  AND start_time >= $2
  AND end_time <= $3
ORDER BY start_time ASC
`

type ListBookingsBetweenForMasterParams struct {
	MasterTelegramID int64
	StartTime        pgtype.Timestamp
	EndTime          pgtype.Timestamp
}

func (q *Queries) ListBookingsBetweenForMaster(ctx context.Context, arg ListBookingsBetweenForMasterParams) ([]Booking, error) {
	rows, err := q.db.Query(ctx, listBookingsBetweenForMaster, arg.MasterTelegramID, arg.StartTime, arg.EndTime)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Booking
	for rows.Next() {
		var i Booking
		if err := rows.Scan(
			&i.ID,
			&i.StartTime,
			&i.EndTime,
			&i.Email,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.MasterTelegramID,
			&i.CustomerTelegramID,
			&i.AppointmentID,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateAppointment = `-- name: UpdateAppointment :exec
UPDATE appointment
SET
    title = $2,
    description = $3,
    image_url = $4,
    price = $5,
    telegram_id = $6,
    updated_at = now()
WHERE id = $1
`

type UpdateAppointmentParams struct {
	ID          int64
	Title       string
	Description string
	ImageUrl    string
	Price       string
	TelegramID  int64
}

func (q *Queries) UpdateAppointment(ctx context.Context, arg UpdateAppointmentParams) error {
	_, err := q.db.Exec(ctx, updateAppointment,
		arg.ID,
		arg.Title,
		arg.Description,
		arg.ImageUrl,
		arg.Price,
		arg.TelegramID,
	)
	return err
}

const upsertAvailability = `-- name: UpsertAvailability :exec
INSERT INTO availability (telegram_id, weekday, start_time, end_time, updated_at)
VALUES ($1, $2, $3, $4, now())
ON CONFLICT (telegram_id, weekday)
    DO UPDATE
    SET start_time = EXCLUDED.start_time,
        end_time = EXCLUDED.end_time,
        updated_at = now()
`

type UpsertAvailabilityParams struct {
	TelegramID int64
	Weekday    int16
	StartTime  pgtype.Time
	EndTime    pgtype.Time
}

func (q *Queries) UpsertAvailability(ctx context.Context, arg UpsertAvailabilityParams) error {
	_, err := q.db.Exec(ctx, upsertAvailability,
		arg.TelegramID,
		arg.Weekday,
		arg.StartTime,
		arg.EndTime,
	)
	return err
}

const upsertUser = `-- name: UpsertUser :one

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
RETURNING id, telegram_id, username, first_name, last_name, photo_url, language_code, is_bot, allows_write_to_pm, added_to_attachment_menu, created_at, updated_at
`

type UpsertUserParams struct {
	TelegramID            int64
	Username              string
	FirstName             string
	LastName              string
	PhotoUrl              pgtype.Text
	LanguageCode          pgtype.Text
	IsBot                 pgtype.Bool
	AllowsWriteToPm       pgtype.Bool
	AddedToAttachmentMenu pgtype.Bool
}

// USERS
func (q *Queries) UpsertUser(ctx context.Context, arg UpsertUserParams) (User, error) {
	row := q.db.QueryRow(ctx, upsertUser,
		arg.TelegramID,
		arg.Username,
		arg.FirstName,
		arg.LastName,
		arg.PhotoUrl,
		arg.LanguageCode,
		arg.IsBot,
		arg.AllowsWriteToPm,
		arg.AddedToAttachmentMenu,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.TelegramID,
		&i.Username,
		&i.FirstName,
		&i.LastName,
		&i.PhotoUrl,
		&i.LanguageCode,
		&i.IsBot,
		&i.AllowsWriteToPm,
		&i.AddedToAttachmentMenu,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

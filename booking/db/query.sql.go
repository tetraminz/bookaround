// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: query.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const deleteBooking = `-- name: DeleteBooking :exec
DELETE FROM booking WHERE id = $1
`

func (q *Queries) DeleteBooking(ctx context.Context, id int64) error {
	_, err := q.db.Exec(ctx, deleteBooking, id)
	return err
}

const getAvailability = `-- name: GetAvailability :many


SELECT weekday, start_time, end_time FROM availability
ORDER BY weekday
`

// AVAILIBILITY
func (q *Queries) GetAvailability(ctx context.Context) ([]Availability, error) {
	rows, err := q.db.Query(ctx, getAvailability)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Availability
	for rows.Next() {
		var i Availability
		if err := rows.Scan(&i.Weekday, &i.StartTime, &i.EndTime); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const insertBooking = `-- name: InsertBooking :one

INSERT INTO booking (start_time, end_time, email)
VALUES ($1, $2, $3)
RETURNING id, start_time, end_time, email, created_at
`

type InsertBookingParams struct {
	StartTime pgtype.Timestamp
	EndTime   pgtype.Timestamp
	Email     string
}

// BOOKING
func (q *Queries) InsertBooking(ctx context.Context, arg InsertBookingParams) (Booking, error) {
	row := q.db.QueryRow(ctx, insertBooking, arg.StartTime, arg.EndTime, arg.Email)
	var i Booking
	err := row.Scan(
		&i.ID,
		&i.StartTime,
		&i.EndTime,
		&i.Email,
		&i.CreatedAt,
	)
	return i, err
}

const listBookings = `-- name: ListBookings :many
SELECT id, start_time, end_time, email, created_at FROM booking
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

const listBookingsBetween = `-- name: ListBookingsBetween :many
SELECT id, start_time, end_time, email, created_at FROM booking
WHERE start_time >= $1 AND end_time <= $2
`

type ListBookingsBetweenParams struct {
	StartTime pgtype.Timestamp
	EndTime   pgtype.Timestamp
}

func (q *Queries) ListBookingsBetween(ctx context.Context, arg ListBookingsBetweenParams) ([]Booking, error) {
	rows, err := q.db.Query(ctx, listBookingsBetween, arg.StartTime, arg.EndTime)
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

const updateAvailability = `-- name: UpdateAvailability :exec
INSERT INTO availability (weekday, start_time, end_time)
VALUES ($1, $2, $3)
ON CONFLICT (weekday) DO UPDATE
SET start_time = $2, end_time = $3
`

type UpdateAvailabilityParams struct {
	Weekday   int16
	StartTime pgtype.Time
	EndTime   pgtype.Time
}

func (q *Queries) UpdateAvailability(ctx context.Context, arg UpdateAvailabilityParams) error {
	_, err := q.db.Exec(ctx, updateAvailability, arg.Weekday, arg.StartTime, arg.EndTime)
	return err
}

const upsertUser = `-- name: UpsertUser :one

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

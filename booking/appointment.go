package booking

import (
	"context"
	"encore.app/booking/db"
	"encore.dev/beta/auth"
	"encore.dev/beta/errs"
	"time"
)

type Appointment struct {
	ID          int64     `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	ImageURL    string    `json:"image_url"`
	Price       string    `json:"price"`
	TelegramID  int64     `json:"telegram_id"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type CreateAppointmentParams struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	ImageURL    string `json:"image_url"`
	Price       string `json:"price"`
}

//encore:api auth method=POST path=/appointment
func CreateAppointment(ctx context.Context, p *CreateAppointmentParams) (*Appointment, error) {
	eb := errs.B()

	authData, ok := auth.Data().(*AuthData)
	if !ok {
		return nil, eb.Code(errs.Unavailable).Msg("failed to fetch authData").Err()
	}

	// TODO валидация url для создания и обновления.
	appointment, err := query.InsertAppointment(ctx, db.InsertAppointmentParams{
		Title:       p.Title,
		Description: p.Description,
		ImageUrl:    p.ImageURL,
		Price:       p.Price,
		TelegramID:  authData.TelegramID,
	})
	if err != nil {
		return nil, eb.Cause(err).Code(errs.Unavailable).Msg("failed to create appointment").Err()
	}

	return &Appointment{
		ID:          appointment.ID,
		Title:       appointment.Title,
		Description: appointment.Description,
		ImageURL:    appointment.ImageUrl,
		Price:       appointment.Price,
		TelegramID:  appointment.TelegramID,
		CreatedAt:   appointment.CreatedAt.Time,
		UpdatedAt:   appointment.UpdatedAt.Time,
	}, nil
}

//encore:api auth method=GET path=/appointment/:id
func GetAppointment(ctx context.Context, id int64) (*Appointment, error) {
	appointment, err := query.GetAppointmentById(ctx, id)
	if err != nil {
		return nil, err
	}
	return &Appointment{
		ID:          appointment.ID,
		Title:       appointment.Title,
		Description: appointment.Description,
		ImageURL:    appointment.ImageUrl,
		Price:       appointment.Price,
		TelegramID:  appointment.TelegramID,
		CreatedAt:   appointment.CreatedAt.Time,
		UpdatedAt:   appointment.UpdatedAt.Time,
	}, nil
}

type ListAppointmentsResponse struct {
	Appointments []*Appointment `json:"appointments"`
}

//encore:api auth method=GET path=/appointments
func ListAppointments(ctx context.Context) (*ListAppointmentsResponse, error) {
	rows, err := query.ListAppointments(ctx)
	if err != nil {
		return nil, err
	}

	var appointments []*Appointment
	for _, row := range rows {
		appointments = append(appointments, &Appointment{
			ID:          row.ID,
			Title:       row.Title,
			Description: row.Description,
			ImageURL:    row.ImageUrl,
			Price:       row.Price,
			TelegramID:  row.TelegramID,
			CreatedAt:   row.CreatedAt.Time,
			UpdatedAt:   row.UpdatedAt.Time,
		})
	}
	return &ListAppointmentsResponse{Appointments: appointments}, nil
}

//encore:api auth method=GET path=/appointments/user/:userName
func ListAppointmentsByUser(ctx context.Context, userName string) (*ListAppointmentsResponse, error) {
	rows, err := query.ListAppointmentsByUserName(ctx, userName)
	if err != nil {
		return nil, err
	}

	var appointments []*Appointment
	for _, row := range rows {
		appointments = append(appointments, &Appointment{
			ID:          row.ID,
			Title:       row.Title,
			Description: row.Description,
			ImageURL:    row.ImageUrl,
			Price:       row.Price,
			TelegramID:  row.TelegramID,
			CreatedAt:   row.CreatedAt.Time,
			UpdatedAt:   row.UpdatedAt.Time,
		})
	}
	return &ListAppointmentsResponse{Appointments: appointments}, nil
}

type UpdateAppointmentParams struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	ImageURL    string `json:"image_url"`
	Price       string `json:"price"`
	TelegramID  int64  `json:"telegram_id"`
}

//encore:api auth method=PUT path=/appointment/:id
func UpdateAppointment(ctx context.Context, id int64, p *UpdateAppointmentParams) error {
	return query.UpdateAppointment(ctx, db.UpdateAppointmentParams{
		ID:          id,
		Title:       p.Title,
		Description: p.Description,
		ImageUrl:    p.ImageURL,
		Price:       p.Price,
		TelegramID:  p.TelegramID,
	})
}

//encore:api auth method=DELETE path=/appointment/:id
func DeleteAppointment(ctx context.Context, id int64) error {
	return query.DeleteAppointment(ctx, id)
}

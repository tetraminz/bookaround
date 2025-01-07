package booking

import (
	"context"
	"encore.app/booking/db"
	"encore.dev/beta/auth"
	"encore.dev/beta/errs"
	"github.com/jackc/pgx/v5/pgtype"
)

//encore:api auth method=POST path=/tma/signup
func UserUpsert(ctx context.Context) error {
	eb := errs.B()

	authData, ok := auth.Data().(*AuthData)
	if !ok {
		return eb.Code(errs.Unavailable).Msg("failed to fetch authData").Err()
	}

	upsertUserParams := db.UpsertUserParams{
		TelegramID: authData.TelegramID,
		Username:   authData.Username,
		FirstName:  authData.FirstName,
		LastName:   authData.LastName,
		PhotoUrl: pgtype.Text{
			String: authData.PhotoUrl,
			Valid:  true,
		},
		LanguageCode: pgtype.Text{
			String: authData.LanguageCode,
			Valid:  true,
		},
		IsBot: pgtype.Bool{
			Bool:  authData.IsBot,
			Valid: true,
		},
		AllowsWriteToPm: pgtype.Bool{
			Bool:  authData.AllowsWriteToPm,
			Valid: true,
		},
		AddedToAttachmentMenu: pgtype.Bool{
			Bool:  authData.AddedToAttachmentMenu,
			Valid: true,
		},
	}

	_, err := query.UpsertUser(ctx, upsertUserParams)
	if err != nil {
		return eb.Cause(err).Code(errs.Internal).Msg("failed to upsert user").Err()
	}

	return nil
}
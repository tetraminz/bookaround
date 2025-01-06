package booking

import (
	"context"
	"encore.dev/beta/auth"
	"encore.dev/beta/errs"
	"encore.dev/rlog"
	initdata "github.com/telegram-mini-apps/init-data-golang"
	"strings"
	"time"
)

// TODO add token to the env
var (
	telegramBotToken = `7917461823:AAGdN9A-_fmyXsH-aa6s-N8BfDJuO677Mm0`
)

type AuthData struct {
	TelegramID            int64
	Username              string
	FirstName             string
	LastName              string
	PhotoUrl              string
	LanguageCode          string
	IsBot                 bool
	AllowsWriteToPm       bool
	AddedToAttachmentMenu bool
}

type AuthParams struct {
	Authorization string `header:"Authorization"`
}

//encore:authhandler
func AuthHandler(ctx context.Context, p *AuthParams) (auth.UID, *AuthData, error) {
	if p.Authorization == "" {
		return "", nil, errs.B().Code(errs.Unauthenticated).Msg("no auth header").Err()
	}

	authParts := strings.Split(p.Authorization, " ")
	if len(authParts) != 2 {
		return "", nil, errs.B().Code(errs.Unauthenticated).Msg("bad auth header").Err()
	}

	authType := authParts[0]
	authData := authParts[1]

	switch authType {
	case "tma":
		// Validate init data. We consider init data sign valid for 1 hour from their
		// creation moment.
		if err := initdata.Validate(authData, telegramBotToken, time.Hour); err != nil {
			rlog.Error(err.Error())
			return "", nil, errs.B().Code(errs.Unauthenticated).Msg("expired auth data").Err()
		}

		// Parse init data. We will surely need it in the future.
		initData, err := initdata.Parse(authData)
		if err != nil {
			rlog.Error(err.Error())
			return "", nil, errs.B().Code(errs.Unauthenticated).Msg("corrupted auth data").Err()
		}

		rlog.Info(initData.User.Username)

		return "test", &AuthData{
			TelegramID:            initData.User.ID,
			Username:              initData.User.Username,
			FirstName:             initData.User.FirstName,
			LastName:              initData.User.LastName,
			PhotoUrl:              initData.User.PhotoURL,
			LanguageCode:          initData.User.LanguageCode,
			IsBot:                 initData.User.IsBot,
			AllowsWriteToPm:       initData.User.AllowsWriteToPm,
			AddedToAttachmentMenu: initData.User.AddedToAttachmentMenu,
		}, nil
	}

	return "", nil, errs.B().Code(errs.Unauthenticated).Msg("not supported auth type").Err()
}

{
	"id": "tap2book-ufx2",

	"global_cors": {
		"debug": true,
		"allow_headers": ["*"],
		"expose_headers": ["*"],

		// Разрешаем запросы без credentials (обычный fetch без cookies/auth)
		// со всех доменов:
		"allow_origins_without_credentials": ["*"],

		// Разрешаем запросы с credentials (cookies или Authorization)
		// только с перечисленных доменов:
		"allow_origins_with_credentials": [
			"http://localhost:3000",       // если вы реально используете http://
			"https://localhost:3000",
			"https://127.0.0.1:3000",
			"https://bookaround.vercel.app"
			// если планируете обращаться с ngrok-домена, его тоже можно сюда добавить
			// "https://b52a-103-156-226-16.ngrok-free.app"
		]
	}
}
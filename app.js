var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var loginFailed = function(response) {
	response.json({
		error: true,
		alerts: {
			code: 200,
			message: "retrieve success"
		},
		data: {
			user_id: 1,
			username: 'budiman',
			roles: [
				'ROLE_ADMIN',
			],
			token: 'asdf1234'
		}
	})
}

var loginSuccess = function(response) {
	response.json({
		error: false,
		alerts: {
			code: 200,
			message: "login failed"
		},
		data: {
			user_id: 1,
			username: 'budiman',
			roles: [
				'ROLE_ADMIN',
			],
			token: 'asdf1234'
		}
	})
}

app.post('/rka-server/api/login', function(req, res, next) {
	var input = req.body;

	if(input.username == 'budiman' && input.password == 'password') {
		loginSuccess(res);
	} else {
		loginFailed(res);
	}
});

app.listen(9090, function() {
	console.log('app listen on 9999');
});
var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/rka-server/api/login', function(req, res, next) {

	console.log(req.body);
	
	res.json({
		error: false,
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
	
});

app.listen(9090, function() {
	console.log('app listen on 9999');
});
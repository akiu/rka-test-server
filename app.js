var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var uploadResponse = require('./res');
var checkPengajuanResponse = require('./res-already.json');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('publics'));

var apiVersion = 'v1';

var loginFailed = function(response) {
	response.status(401)
		.json({
			user_id: 1,
			username: 'kkks',
			roles: [
				'ROLE_ADMIN',
			],
			token: 'hueihrfaudfhajkdfhdfhadhfh',
			kkks_id: 1,
			is_operator: true
		})
}

var loginSuccess = function(response) {
	response.status(200)
		.json({
			user_id: 1,
			username: 'Admin Gila',
			roles: [
				'ROLE_ADMIN',
			],
			token: 'sjkdhdfuhiefjdkfgysfadfgydsfgds',
			kkks_id: 1,
			is_operator: false
		})
}

var loginSuccesskkks = function(response) {
	response.status(200)
		.json({
			user_id: 2,
			username: 'kkks jijay',
			roles: [
				'ROLE_KKKS',
			],
			token: 'asdf1234',
			kkks_id: 1,
			is_operator: true
	})
}

app.use('/assets', express.static('publics'));

app.post('/rka-server/api/login', function(req, res, next) {
	var input = req.body;

	if(input.username == 'admin' && input.password == 'admin') {
		loginSuccess(res);
	}

	if(input.username == 'kkks' && input.password == 'kkks') {
		loginSuccesskkks(res);
	}

	loginFailed(res);

});

app.post('/rka-server/pengajuan/v1/uploadFilePengajuan', upload.single('lampiranRka'), function(req, res, next) {
	console.log(req.file);
	res.json(uploadResponse());
});

app.post('/rka-server/pengajuan/v1/uploadFile', upload.single('file'), function(req, res, next) {
	setTimeout(() => {
		res.json({
			message: 'upload berhasil',
			path: 'http://localhost:9090/file/cok.xlsx'
		})
	}, 10000)
});

app.get('/file/cok.xlsx', upload.single('file'), function(req, res, next) {
	res.sendFile('cok.xlsx', { root : __dirname});
});

app.post('/rka-server/pengajuan/v1/savePengajuanRKA', function(req, res, next) {


	console.log(JSON.stringify(req.body));

	res.json({
        message: "RKA berhasil disimpan",
        idPengajuanRka: 1
    })

    /*
    res.status(400).json({
    	message: 'Gagal menyimpan data RKA'
    });
    */
});

app.post('/rka-server/masterPengajuan/v1/templateDownload', function(req, res, next) {
	setTimeout(function() {
		res.sendFile('cok.xlsx', { root : __dirname});
	}, 10000)

});

app.post('/rka-server/pengajuan/v1/checkPengajuanRka', function(req, res, next) {
	res.json({
		pengajuan: true,
		message: 'Anda sudah submit pengajuan RKA Untuk periode realisasi 2017'
	})
});

// app.post('/rka-server/pengajuan/v1/momPengajuanRka', function(req, res, next) {
// 	res.json({
// 		pengajuan: false,
// 		message: 'Anda sudah submit pengajuan RKA Untuk periode realisasi 2017'
// 	})
// });

app.post('/download', function(req, res, next) {
	setTimeout(function() {
		res.sendFile('cok.xlsx', { root : __dirname});
	}, 5000)
});

app.post('/rka-server/pengajuan/v1/submitPengajuanRka', function(req, res, next) {

    console.log(req.body);

    res.json({
        message: 'Pengajuan RKA berhasil disubmit'
    })
});

app.post('/rka-server/pengajuan/v1/getPengajuanRka', function(req, res, next) {
	//res.json(checkPengajuanResponse);
	res.status(404).json({
		message: 'error'
	})
});

app.post('/rka-server/pengajuan/v1/downloadFile', function(req, res, next) {
    setTimeout(function() {
		res.sendFile('cok.xlsx', { root : __dirname});
	}, 5000)
});

app.post('/rka-server', function(req, res, next) {
	res.json({
		message: 'data posted'
	})
})

app.listen(9090,'0.0.0.0', function() {
	console.log('app listen on 9090');
});

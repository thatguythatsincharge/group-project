const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser());

//make a conection to the server
	var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'nodemon'
	});

	//getting all the posts from the table
	var nodeSql =
		"SELECT * FROM posttable WHERE Category = 'node' ORDER BY id DESC";

	var expressSql =
		"SELECT * FROM posttable WHERE Category = 'express' ORDER BY id DESC";

	var ejsSql =
		"SELECT * FROM posttable WHERE Category = 'ejs' ORDER BY id DESC";

	var Sql =
		"SELECT * FROM posttable";



// Routes
app.get('/', function(req, res) {

	var nodeSq =
		"SELECT * FROM posttable WHERE Category = 'node' ORDER BY id DESC LIMIT 5";

	var expressSq =
		"SELECT * FROM posttable WHERE Category = 'express' ORDER BY id DESC LIMIT 5";

	var ejsSq =
		"SELECT * FROM posttable WHERE Category = 'ejs' ORDER BY id DESC LIMIT 5";

	var Sq =
		"SELECT * FROM posttable";

	con.query(nodeSq, function(err, result1) {
		if (err) {
			throw err;
		}

		con.query(expressSq, function(err, result2) {
			if (err) {
				throw err;
			}

			con.query(ejsSq, function(err, result3) {
				if (err) {
					throw err;
				}

				con.query(Sq, function(err, result4) {
					if (err) {
						throw err;
					}

					res.render('index', {
						nodePosts: result1,
						expressPosts: result2,
						ejsPosts: result3,
						Posts: result4
					});
				});
			});
		});
	});
});



app.get('/nodeArch', function(req, res) {

	con.query(nodeSql, function(err, result) {
		if (err) {
			throw err;
		}

		res.render('nodeArch', {nodePosts: result})
	
	});
});

app.get('/expressArch', function(req, res) {

	con.query(expressSql, function(err, result) {
		if (err) {
			throw err;
		}

		res.render('expressArch', {expressPosts: result})
	
	});
});


app.get('/ejsArch', function(req, res) {
	
	con.query(ejsSql, function(err, result) {
		if (err) {
			throw err;
		}

		res.render('ejsArch', {ejsPosts: result})
	
	});
});

app.get('/newPost', function(req, res) {
	res.render('newPost');
});

app.post('/NodeMon', function(req, res) {
	var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'Nodemon'
	});

	var sql =
		"INSERT INTO posttable (Title, Description, URL, Category, Type) VALUES ('" +
		req.body.Title +
		"','" +
		req.body.Description +
		"','" +
		req.body.URL +
		"','" +
		req.body.Category +
		"','" +
		req.body.Type +
		"')";

	con.query(sql, function(err, result) {
		if (err) {
			throw err;
		}
		console.log('1 record inserted');
		res.redirect('/');
	});
});

app.listen(process.env.PORT || 3000, function() {
	console.log('The application is running on port 3000');
});
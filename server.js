var express = require( 'express' );
var mysql = require( 'mysql' );
var bodyParser = require( 'body-parser' );
var ejs = require( 'ejs' );

var app = express();

app.set( 'view engine', 'ejs' );
app.use( express.static( 'public' ) );

app.use( bodyParser() );

// Routes
app.get( '/', function( req, res ) {

	var con = mysql.createConnection( {
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'nodemon'
	} );


	var sql =
		"SELECT * FROM posttable";

	con.query( sql, function( err, result ) {
		if ( err ) {
			throw err;
		}
		res.render( 'index', {
			posts: result
		} );
		//getting all the posts with category of node
		// 	console.log(result.Title);
		// var node = "SELECT * FROM posttable WHERE Category =='node'";

		// 	con.query(node, function(err, result) {
		// 		if (err) {
		// 			throw err;
		// 		}

		// 		console.log(result);
		// });
	} );
} );

app.get( '/archive', function( req, res ) {
	res.render( 'archive' );
} );

app.post( '/NodeMon', function( req, res ) {
	var con = mysql.createConnection( {
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'Nodemon'
	} );

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
		')';

	con.query( sql, function( err, result ) {
		if ( err ) {
			throw err;
		}

		console.log( '1 record inserted' );
		res.redirect( '/', {
			inserted: true
		} );
	} );
} );

app.listen( 3000, function() {
	console.log( 'The application is running on port 3000' );
} );
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var database = require('./config/database');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
mongoose.connect(database.localUrl);
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));
require('./app/routes.js')(app);
app.listen(port);
console.log("App listening on port " + port);
//# sourceMappingURL=server.js.map
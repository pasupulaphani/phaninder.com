var mongoose   = require('mongoose');
var express    = require('express');
(process.env.NODE_ENV === 'prod') ? require('newrelic') : ''

var config     = require('./config/config');
var configUtil = require('./app/helpers/configUtil.js');

var models     = require('./app/models');
var routes     = require('./config/routes');
var middleware = require('./config/express');

mongoose.connect(configUtil.getDBURL(config), function(err) {
	if (err) throw err;

	var app = express();
	app.locals.home_dir = __dirname;

	middleware(app, config);
	routes(app);

	port = process.env.VCAP_APP_PORT || process.env.OPENSHIFT_NODEJS_PORT || process.env.port || 3000;
  ip = process.env.OPENSHIFT_NODEJS_IP;

	app.listen(port, ip, function() {
		console.log('listening on port ' + port);
	});
});

var Beer = require('./models/beer');
var Checkin = require('./models/checkin');

function getBeers(res) {
    Beer.find(function (err, beers) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(beers); // return all beers in JSON format
    });
};

function getCheckins(res) {
    Checkin.find(function(err, checkins) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(checkins); // return all checkins in JSON format
    });
};

module.exports = function (app) {
    // api ---------------------------------------------------------------------
    // get all beers
    app.get('/api/beers', function (req, res) {
        // use mongoose to get all beers in the database
        getBeers(res);
    });

    // create beer and send back all beers after creation
    app.post('/api/beers', function (req, res) {
        // create a beer, information comes from AJAX request from Angular
        Beer.create({
            name: req.body.name,
            brewery: req.body.brewery,
            style: req.body.style,
            substyle: req.body.substyle
        }, function (err, beer) {
            if (err)
                res.send(err);

            // get and return all the beers after you create another
            getBeers(res);
        });
    });

    // delete a beer
    app.delete('/api/beers/:beer_id', function (req, res) {
        Beer.remove({
            _id: req.params.beer_id
        }, function (err, beer) {
            if (err)
                res.send(err);

            getBeers(res);
        });
    });

    // get all checkins
    app.get('/api/checkins', function (req, res) {
        // use mongoose to get all checkins in the database
        getCheckins(res);
    });

    // create checkin and send back all checkins after creation
    app.post('/api/checkins', function (req, res) {
        // create a checkin, information comes from AJAX request from Angular
        Checkin.create({
            beerId: req.body.beerId,
            comment: req.body.comment,
            rating: req.body.rating
        }, function (err, checkin) {
            if (err)
                res.send(err);

            // get and return all the checkins after you create another
            getCheckins(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
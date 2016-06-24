var Beer = require('./models/beer');

function getBeers(res) {
    Beer.find(function (err, beers) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(beers); // return all beers in JSON format
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

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
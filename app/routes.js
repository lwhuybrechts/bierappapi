var Beer = require('./models/beer');
var Checkin = require('./models/checkin');
function getBeers(res) {
    Beer.find(function (err, beers) {
        if (err) {
            res.send(err);
        }
        res.json(beers);
    });
}
;
function getCheckins(res) {
    Checkin.find(function (err, checkins) {
        if (err) {
            res.send(err);
        }
        res.json(checkins);
    });
}
;
module.exports = function (app) {
    app.get('/api/beers', function (req, res) {
        getBeers(res);
    });
    app.post('/api/beers', function (req, res) {
        Beer.create({
            name: req.body.name,
            brewery: req.body.brewery,
            style: req.body.style,
            substyle: req.body.substyle
        }, function (err, beer) {
            if (err)
                res.send(err);
            getBeers(res);
        });
    });
    app.delete('/api/beers/:beer_id', function (req, res) {
        Beer.remove({
            _id: req.params.beer_id
        }, function (err, beer) {
            if (err)
                res.send(err);
            getBeers(res);
        });
    });
    app.get('/api/checkins', function (req, res) {
        getCheckins(res);
    });
    app.post('/api/checkins', function (req, res) {
        Checkin.create({
            beerId: req.body.beerId,
            comment: req.body.comment,
            rating: req.body.rating
        }, function (err, checkin) {
            if (err)
                res.send(err);
            getCheckins(res);
        });
    });
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
};
//# sourceMappingURL=routes.js.map
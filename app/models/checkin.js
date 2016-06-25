var mongoose = require('mongoose');
var checkinSchema = mongoose.Schema({
    beerId: String,
    comment: String,
    rating: Number
}, {
    timestamps: true
});
module.exports = mongoose.model('Checkin', checkinSchema);
//# sourceMappingURL=checkin.js.map
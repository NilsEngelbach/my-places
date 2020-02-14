const Places = require('../models/places');

exports.readAll = (req, res, next) => {
    Places.find({}, (err, places) => {
        if (err) return next(err);
        return res.send(places);
    });
};

exports.read = (req, res, next) => {
    Places.findOne({ _id: req.params.id }, (err, place) => {
        if (err) return next(err);
        return res.send(place);
    });
};

exports.create = (req, res, next) => {
    const newPlace = new Places({
        name: req.body.name,
        lat: req.body.lat,
        lng: req.body.lng,
        imageUrl: req.body.imageUrl
    });
    newPlace.save((err, place) => {
        if (err) return next(err);
        return res.send(place);
    });
};

exports.delete = (req, res, next) => {
    Places.findOneAndRemove({ _id: req.params.id }, (err) => {
        if (err) return next(err);
        return res.status(200).json({ message: 'Deleted successfully!' });
    });
};

exports.update = (req, res, next) => {
    let set = {
        name: req.body.name,
        imageUrl: req.body.imageUrl
    };

    Places.findOneAndUpdate(
        { _id: req.params.id },
        { $set: set },
        { new: true },
        (err, place) => {
            if (err) return next(err);
            if (!place) return res.status(404).json({ error: "Can not find item" });
            return res.send(place);
        }
    );
};

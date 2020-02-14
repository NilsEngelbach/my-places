const Places = require('../models/places');

exports.readAll = (req, res, next) => {
    Places.find({}, (err, lists) => {
        if (err) return next(err);
        return res.send(lists);
    });
};

exports.read = (req, res, next) => {
    Places.findOne({ _id: req.params.id }, (err, list) => {
        if (err) return next(err);
        return res.send(list);
    });
};

exports.create = (req, res, next) => {
    const newPlace = new Places({
        
    });
    newPlace.save((err, list) => {
        if (err) return next(err);
        return res.send(list);
    });
};

exports.delete = (req, res, next) => {
    Places.findOneAndRemove({ _id: req.params.id }, (err) => {
        if (err) return next(err);
        return res.status(200).json({ message: 'Deleted successfully!' });
    });
};

exports.update = (req, res, next) => {
    let set = {};

    if (req.body.name != undefined) set['$.name'] = req.body.name;
    // if (req.body.bought != undefined) set['$.bought'] = req.body.bought;

    Places.findOneAndUpdate(
        { _id: req.params.listid },
        { $set: set },
        { new: false },
        (err, list) => {
            if (err) return next(err);
            if (!list) return res.status(404).json({ error: "Can not find item" });
            return res.send(list);
        }
    );
};

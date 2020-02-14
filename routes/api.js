const express = require('express'),
      placesController = require('../controllers/places');

const router = express.Router();

router.get('/', placesController.readAll);

router.post('/', placesController.create);

router.get('/:id', placesController.read);

router.put('/:id', placesController.update);

router.delete('/:id', placesController.delete);

module.exports = router;
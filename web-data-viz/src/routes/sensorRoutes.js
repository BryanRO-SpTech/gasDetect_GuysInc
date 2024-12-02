const express = require('express');
const router = express.Router();

const sentorController = require('../controllers/sensorController');


router.post("/solicitar", function (req, res) {
    sentorController.solicitarSensor(req, res);
});

module.exports = router;
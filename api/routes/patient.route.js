const { createNewPatient, getPatientData, recordHeartRate, getHeartRate } = require('../controllers/patient.controller.js');
const { verifyUser } = require('../utils/verifyUser.js');

const router = require('express').Router();

router
    .post('/create-patient', verifyUser, createNewPatient)
    .post('/record-heartrate/:patientId', verifyUser, recordHeartRate)

    .get('/get-patient/:patientId', verifyUser, getPatientData)
    .get('/get-heartrate/:patientId', verifyUser, getHeartRate)

module.exports = router;

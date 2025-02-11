const Patient = require("../models/patient.model.js");

exports.createNewPatient = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      dob,
      email,
      address,
      admissionDate,
      diseaseData,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !gender ||
      !dob ||
      !email ||
      !admissionDate ||
      !diseaseData ||
      !address
    ) {
      return res.status(422).json({ error: "All fields are required!" });
    }

    if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format!" });
    }

    const existingPatient = await Patient.findOne({ email });

    if (existingPatient) {
      return res.status(409).json({ error: "Patient's email already exists" });
    }

    const patient = await Patient.create({
      firstName,
      lastName,
      gender,
      dob,
      email,
      address,
      admissionDate,
      diseaseData,
    });

    return res
      .status(201)
      .json({
        message: "New patient created",
        patient: {
          patientId: patient.patientId,
          firstName: patient.firstName,
          lastName: patient.lastName,
          email: patient.email,
        },
      });
  } catch (error) {
    next(error);
  }
};

exports.getPatientData = async (req, res, next) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({ error: "No user id found" });
    }

    const patient = await Patient.findOne({ patientId });

    if (!patient) {
      return res.status(401).json({ error: "Invalid patient id" });
    }

    return res
      .status(200)
      .json({ message: "Patient details retrieved", patient });
  } catch (error) {
    next(error);
  }
};

exports.recordHeartRate = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const { heartRate } = req.body;

    if (!patientId) {
      return res.status(400).json({ error: "No user id found" });
    }

    if (!heartRate) {
      return res.status(422).json({ error: "Heart rate field required" });
    }

    const patient = await Patient.findOne({ patientId });

    patient.vitals.heartRate = heartRate
    await patient.save();

    return res
      .status(200)
      .json({
        message: "Heart rate recorded",
        recordedHeartRate: patient.vitals,
      });
  } catch (error) {
    next(error);
  }
};

exports.getHeartRate = async (req, res, next) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({ error: "No user id found" });
    }

    const currentHeartRate = await Patient.findOne({ patientId });

    const { heartRate, recordedAt } = currentHeartRate.vitals;

    return res
      .status(200)
      .json({
        message: "Heart Rate Retrieved",
        HeartRate: heartRate,
        recordedAt,
      });
  } catch (error) {
    next(error);
  }
};

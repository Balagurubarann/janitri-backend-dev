const { Schema, model } = require("mongoose");

function generateRandomAlphanumeric() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

const patientSchema = new Schema(
  {
    patientId: {
        type: String,
        default: generateRandomAlphanumeric()
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },

    dob: {
      type: Date,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
      validate: {
        validator: function (value) {
          return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: "Invalid email format",
      },
    },

    address: {
      type: String,
      required: true
    },

    admissionDate: {
      type: String,
      required: true,
    },

    diseaseData: {
      type: String,
      required: true,
    },

    vitals: {
      heartRate: {
        type: String,
        default: 80.6
      },
      recordedAt: {
        type: Date,
        default: Date.now,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Patient = model("Patient", patientSchema);

module.exports = Patient;

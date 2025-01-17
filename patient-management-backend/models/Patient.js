import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  diagnosis: { type: String, required: true },
  isEdited: { type: Boolean, default: false },
  discharged: { type: Boolean, default: false },
  admissionDate: { type: Date, default: Date.now }
});

export default mongoose.model('Patient', patientSchema); 
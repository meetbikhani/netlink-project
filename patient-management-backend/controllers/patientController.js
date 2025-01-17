import Patient from '../models/Patient.js';

// Get all patients
const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new patient
const createPatient = async (req, res) => {
    const patient = new Patient(req.body);
    try {
        const newPatient = await patient.save();
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update patient
const updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        if (req.body.discharged !== undefined) {
            patient.discharged = req.body.discharged;
        } else {
            Object.assign(patient, req.body);
            patient.isEdited = true;
        }
        
        const updatedPatient = await patient.save();
        res.json(updatedPatient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export {
    getPatients,
    createPatient,
    updatePatient
}; 
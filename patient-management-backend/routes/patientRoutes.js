import express from 'express';
import {
    getPatients,
    createPatient,
    updatePatient
} from '../controllers/patientController.js';

const router = express.Router();

router.get('/', getPatients);
router.post('/', createPatient);
router.put('/:id', updatePatient);

export default router; 
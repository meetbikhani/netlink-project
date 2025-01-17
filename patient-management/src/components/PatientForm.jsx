import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
} from "@mui/material";
import { useState, useEffect } from "react";

function PatientForm({ open, onClose, onSubmit, patient }) {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        contact: "",
        address: "",
        diagnosis: "",
    });

    useEffect(() => {
        if (patient) {
            setFormData({
                name: patient.name,
                age: patient.age,
                gender: patient.gender,
                contact: patient.contact,
                address: patient.address,
                diagnosis: patient.diagnosis,
            });
        }
    }, [patient]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            name: "",
            age: "",
            gender: "",
            contact: "",
            address: "",
            diagnosis: "",
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {patient ? "Edit Patient" : "Add New Patient"}
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <TextField
                            name="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            name="age"
                            label="Age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                        <FormControl>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                label="Gender"
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            name="contact"
                            label="Contact"
                            value={formData.contact}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            name="address"
                            label="Address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            name="diagnosis"
                            label="Diagnosis"
                            value={formData.diagnosis}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">
                        {patient ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default PatientForm;

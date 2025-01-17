import { useState, useEffect } from "react";
import { Tabs, Tab, Box, Container, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PatientTable from "./components/PatientTable";
import PatientForm from "./components/PatientForm";
import axios from "axios";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const API_URL = "http://localhost:5000/api";

function App() {
    const [tab, setTab] = useState(0);
    const [patients, setPatients] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [editingPatient, setEditingPatient] = useState(null);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        const response = await axios.get(`${API_URL}/patients`);
        setPatients(response.data);
    };

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleEdit = (patient) => {
        setEditingPatient(patient);
        setOpenForm(true);
    };

    const handleDischargeChange = async (patientId, discharged) => {
        await axios.put(`${API_URL}/patients/${patientId}`, { discharged });
        patients.filter((p) => p._id === patientId)[0].discharged = discharged;
        setPatients([...patients]);
    };

    const handleFormSubmit = async (patientData) => {
        if (editingPatient) {
            await axios.put(
                `${API_URL}/patients/${editingPatient._id}`,
                patientData
            );
            setPatients((prev) =>
                prev.map((p) => {
                    return p._id === editingPatient._id
                        ? {
                              ...patientData,
                              admissionDate: p.admissionDate, 
                              discharged: p.discharged, 
                              isEdited: true,
                          }
                        : p; 
                })
            );
        }
        else{
            await axios.post(`${API_URL}/patients`, patientData);
            const newPatientData = {
                ...patientData,
                admissionDate: new Date().toLocaleDateString(),
                discharged: false,
                isEdited: false,
            };
            setPatients((prev) => [...prev, newPatientData]);
        }
        setOpenForm(false);
        setEditingPatient(null);
    };

    return (
        <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
            <nav
                style={{
                    backgroundColor: "white",
                    padding: "1rem",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    marginBottom: "2rem",
                }}
            >
                <Container>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <h1 style={{ margin: 0, color: "#1976d2" }}>
                            Patient Management
                        </h1>
                        <IconButton
                            color="primary"
                            onClick={() => setOpenForm(true)}
                            sx={{
                                backgroundColor: "#e3f2fd",
                                "&:hover": {
                                    backgroundColor: "#bbdefb",
                                },
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Box>
                </Container>
            </nav>

            <Container>
                <Box
                    sx={{
                        backgroundColor: "white",
                        padding: "1rem",
                        borderRadius: "8px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                >
                    <Tabs
                        value={tab}
                        onChange={handleTabChange}
                        sx={{
                            "& .MuiTab-root": {
                                textTransform: "none",
                                fontSize: "1rem",
                            },
                        }}
                    >
                        <Tab label="All Patients" />
                        <Tab label="Edited Patients" />
                        <Tab label="Discharged Patients" />
                    </Tabs>

                    {tab === 0 && (
                        <PatientTable
                            patients={patients.filter((p) => !p.discharged)}
                            onEdit={handleEdit}
                            onDischargeChange={handleDischargeChange}
                        />
                    )}
                    {tab === 1 && (
                        <PatientTable
                            patients={patients.filter(
                                (p) => p.isEdited && !p.discharged
                            )}
                            onEdit={handleEdit}
                            onDischargeChange={handleDischargeChange}
                        />
                    )}
                    {tab === 2 && (
                        <PatientTable
                            patients={patients.filter((p) => p.discharged)}
                            onEdit={handleEdit}
                            onDischargeChange={handleDischargeChange}
                            disableActions
                        />
                    )}
                </Box>
            </Container>

            <PatientForm
                open={openForm}
                onClose={() => {
                    setOpenForm(false);
                    setEditingPatient(null);
                }}
                onSubmit={handleFormSubmit}
                patient={editingPatient}
            />
        </div>
    );
}

export default App;

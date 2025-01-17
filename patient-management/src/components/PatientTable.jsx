import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button, Select, MenuItem } from "@mui/material";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

function PatientTable({ patients, onEdit, onDischargeChange, disableActions }) {
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: "contains" },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setFilters({ global: { value, matchMode: "contains" } });
        setGlobalFilterValue(value);
    };

    const renderHeader = () => (
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Search (Name, Gender, Address, Diagnosis)"
                    style={{ width: "100%", minWidth: "300px" }}
                />
            </span>
        </div>
    );

    const actionBodyTemplate = (rowData) => (
        <div style={{ display: "flex", gap: "8px" }}>
            <Button
                variant="contained"
                size="small"
                onClick={() => onEdit(rowData)}
                sx={{ textTransform: "none" }}
            >
                Edit
            </Button>
            <Select
                value={rowData.discharged}
                size="small"
                onChange={(e) => onDischargeChange(rowData._id, e.target.value)}
                sx={{ minWidth: "120px" }}
            >
                <MenuItem value={false}>Active</MenuItem>
                <MenuItem value={true}>Discharged</MenuItem>
            </Select>
        </div>
    );

    const dateBodyTemplate = (rowData) =>
        new Date(rowData.admissionDate).toLocaleDateString();

    return (
        <div style={{ marginTop: "1rem" }}>
            <DataTable
                value={patients}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                stripedRows
                showGridlines
                size="small"
                emptyMessage="No patients found"
                filters={filters}
                filterDisplay="menu"
                globalFilterFields={["name", "gender", "address", "diagnosis"]}
                header={renderHeader()}
            >
                <Column field="name" header="Name" />
                <Column field="age" header="Age" />
                <Column field="gender" header="Gender" />
                <Column field="contact" header="Contact" />
                <Column field="address" header="Address" />
                <Column field="diagnosis" header="Diagnosis" />
                <Column field="admissionDate" header="Admission Date" body={dateBodyTemplate} />
                {!disableActions && (
                    <Column body={actionBodyTemplate} header="Actions" style={{ width: "250px" }} />
                )}
            </DataTable>
        </div>
    );
}

export default PatientTable;

import React, { useState, useEffect } from 'react';
import SearchBar from '../../molecules/SearchBar/SearchBar';
import DataTable from '../../organisms/DataTable/DataTable';
import './TablePage.css';

const TablePage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const headers = {
    id: 'ID',
    name: 'Patient Name',
    age: 'Age',
    city: 'City',
    disease: 'Disease',
    doctor: 'Doctor',
    lastVisit: 'Last Visit'
  };

  // Sample data
  const sampleData = [
    {
      id: 1,
      name: 'John Smith',
      age: 45,
      city: 'New York',
      disease: 'Diabetes',
      doctor: 'Dr. Wilson',
      lastVisit: '2024-02-15'
    },
    {
      id: 2,
      name: 'Emma Johnson',
      age: 32,
      city: 'Los Angeles',
      disease: 'Hypertension',
      doctor: 'Dr. Martinez',
      lastVisit: '2024-02-18'
    },
    {
      id: 3,
      name: 'Michael Brown',
      age: 28,
      city: 'Chicago',
      disease: 'Asthma',
      doctor: 'Dr. Anderson',
      lastVisit: '2024-02-10'
    },
    {
      id: 4,
      name: 'Sarah Davis',
      age: 52,
      city: 'Houston',
      disease: 'Arthritis',
      doctor: 'Dr. Thompson',
      lastVisit: '2024-02-20'
    },
    {
      id: 5,
      name: 'David Wilson',
      age: 39,
      city: 'Phoenix',
      disease: 'Migraine',
      doctor: 'Dr. Garcia',
      lastVisit: '2024-02-14'
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      age: 41,
      city: 'Miami',
      disease: 'Allergies',
      doctor: 'Dr. Roberts',
      lastVisit: '2024-02-17'
    },
    {
      id: 7,
      name: 'James Taylor',
      age: 63,
      city: 'Seattle',
      disease: 'Heart Disease',
      doctor: 'Dr. White',
      lastVisit: '2024-02-12'
    },
    {
      id: 8,
      name: 'Maria Garcia',
      age: 35,
      city: 'San Diego',
      disease: 'Anxiety',
      doctor: 'Dr. Brown',
      lastVisit: '2024-02-19'
    }
  ];

  useEffect(() => {
    // Simulating API call with sample data
    setTimeout(() => {
      setData(sampleData);
      setFilteredData(sampleData);
      setLoading(false);
    }, 1000); // Simulate 1 second loading time
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = data.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(term)
      )
    );
    setFilteredData(filtered);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="table-page">
      <SearchBar value={searchTerm} onChange={handleSearch} />
      <DataTable data={filteredData} headers={headers} />
    </div>
  );
};

export default TablePage; 
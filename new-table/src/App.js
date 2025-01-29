import React from 'react';
import './App.css';
import TablePage from './components/pages/TablePage/TablePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My React Table App</h1>
      </header>
      <main>
        <TablePage />
      </main>
    </div>
  );
}

export default App; 
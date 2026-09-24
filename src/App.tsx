import './App.css'
import { useEntries } from "./hooks/useEntries";
import { DBTest2 } from './components/DBTest';
import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from './pages/Home';
import { AddEntry } from './pages/AddEntry';
import { AddFood } from './pages/AddFood';
import { NavMenu } from './components/NavMenu';
import { useState } from 'react';

function App() {
  const [entriesVersion, setEntriesVersion] = useState(0);

  const handleEntriesImported = () => {
    setEntriesVersion(value => value + 1);
  };

  return (
    <BrowserRouter>
      <NavMenu onEntriesImported={handleEntriesImported} />

      <Routes>
        <Route path="/" element={<Home entriesVersion={entriesVersion}/>} />
        <Route path="/add-entry" element={<AddEntry />} />
        <Route path="/add-food" element={<AddFood />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

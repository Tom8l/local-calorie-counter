import './App.css'
import { useEntries } from "./hooks/useEntries";
import { DBTest2 } from './components/DBTest';
import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from './pages/Home';
import { AddEntry } from './pages/AddEntry';
import { AddFood } from './pages/AddFood';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-entry" element={<AddEntry />} />
        <Route path="/add-food" element={<AddFood />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

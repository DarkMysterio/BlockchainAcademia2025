import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import AdminPage from './pages/AdminPage'
import NGOPage from './pages/NGOPage'
import VolunteerPage from './pages/VolunteerPage'
import PresentationPage from './pages/PresentationPage'
import OceanPage from './pages/OceanPage'
import './App.css'

function App() {
  const [ngos, setNgos] = useState([])
  const [certificates, setCertificates] = useState([])

  const addNgo = (ngo) => {
    setNgos([...ngos, { ...ngo, id: Date.now() }])
  }

  const addCertificate = (certificate) => {
    setCertificates([...certificates, { ...certificate, id: Date.now(), issueDate: new Date().toLocaleDateString() }])
  }

  const updateCertificate = (certificateId, updatedData) => {
    setCertificates(certificates.map(cert => 
      cert.id === certificateId ? { ...cert, ...updatedData } : cert
    ))
  }

  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="container">
            <div className="logo">
              <img src="/logoCropped.png" alt="Logo" className="logo-img" />
              <h1>Certificate Management System</h1>
            </div>
            <nav className="nav">
              <Link to="/presentation" className="nav-link">About</Link>
              <Link to="/ocean" className="nav-link">Ocean</Link>
              <Link to="/admin" className="nav-link">Admin</Link>
              <Link to="/ngo" className="nav-link">NGO</Link>
              <Link to="/volunteer" className="nav-link">Volunteer</Link>
            </nav>
          </div>
        </header>

        <main className="main">
          <div className="container">
            <Routes>
              <Route path="/" element={<PresentationPage />} />
              <Route path="/presentation" element={<PresentationPage />} />
              <Route path="/ocean" element={<OceanPage />} />
              <Route path="/admin" element={<AdminPage ngos={ngos} addNgo={addNgo} />} />
              <Route path="/ngo" element={<NGOPage ngos={ngos} certificates={certificates} addCertificate={addCertificate} updateCertificate={updateCertificate} />} />
              <Route path="/volunteer" element={<VolunteerPage certificates={certificates} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App

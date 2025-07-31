import { useState } from 'react'

function NGOPage({ ngos, certificates, addCertificate, updateCertificate }) {
  const [formData, setFormData] = useState({
    ngoId: '',
    volunteerName: '',
    volunteerEmail: '',
    certificateType: '',
    hours: '',
    description: ''
  })

  const [editingCertificate, setEditingCertificate] = useState(null)
  const [updateHours, setUpdateHours] = useState('')
  const [searchEmail, setSearchEmail] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearch, setShowSearch] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.ngoId && formData.volunteerName && formData.volunteerEmail && formData.certificateType) {
      const selectedNgo = ngos.find(ngo => ngo.id === parseInt(formData.ngoId))
      addCertificate({
        ...formData,
        ngoName: selectedNgo?.name || 'Unknown NGO'
      })
      setFormData({
        ngoId: '',
        volunteerName: '',
        volunteerEmail: '',
        certificateType: '',
        hours: '',
        description: ''
      })
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdateHours = (certificateId) => {
    if (updateHours && parseFloat(updateHours) > 0) {
      updateCertificate(certificateId, { hours: updateHours })
      setEditingCertificate(null)
      setUpdateHours('')
    }
  }

  const startEditing = (certificate) => {
    setEditingCertificate(certificate.id)
    setUpdateHours(certificate.hours || '')
  }

  const cancelEditing = () => {
    setEditingCertificate(null)
    setUpdateHours('')
  }

  const handleSearchCertificates = (e) => {
    e.preventDefault()
    if (searchEmail.trim()) {
      const results = certificates.filter(
        cert => cert.volunteerEmail.toLowerCase() === searchEmail.toLowerCase().trim()
      )
      setSearchResults(results)
    }
  }

  const clearSearch = () => {
    setSearchEmail('')
    setSearchResults([])
    setShowSearch(false)
  }

  return (
    <div className="page">
      <h2>🏢 NGO Dashboard</h2>
      <p>Issue volunteer certificates and recognize outstanding contributions</p>

      {ngos.length === 0 ? (
        <div className="info-box">
          <p><strong>🏢 No NGOs registered yet.</strong> Please ask an admin to register your NGO first.</p>
        </div>
      ) : (
        <div className="form">
          <h3>🎖️ Issue New Certificate</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="ngoId">Select NGO:</label>
              <select
                id="ngoId"
                name="ngoId"
                value={formData.ngoId}
                onChange={handleChange}
                required
              >
                <option value="">Choose an NGO</option>
                {ngos.map((ngo) => (
                  <option key={ngo.id} value={ngo.id}>
                    {ngo.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="volunteerName">Volunteer Name:</label>
              <input
                type="text"
                id="volunteerName"
                name="volunteerName"
                value={formData.volunteerName}
                onChange={handleChange}
                required
                placeholder="Enter volunteer's full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="volunteerEmail">Volunteer Email:</label>
              <input
                type="email"
                id="volunteerEmail"
                name="volunteerEmail"
                value={formData.volunteerEmail}
                onChange={handleChange}
                required
                placeholder="Enter volunteer's email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="certificateType">Certificate Type:</label>
              <select
                id="certificateType"
                name="certificateType"
                value={formData.certificateType}
                onChange={handleChange}
                required
              >
                <option value="">Select certificate type</option>
                <option value="Community Service">Community Service</option>
                <option value="Environmental Conservation">Environmental Conservation</option>
                <option value="Education Support">Education Support</option>
                <option value="Healthcare Assistance">Healthcare Assistance</option>
                <option value="Disaster Relief">Disaster Relief</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="hours">Hours Completed:</label>
              <input
                type="number"
                id="hours"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                min="1"
                placeholder="Enter number of hours"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of volunteer work"
              />
            </div>

            <button type="submit">🎖️ Issue Certificate</button>
          </form>
        </div>
      )}

      {/* Search and Update Certificates Section */}
      <div className="form">
        <h3>🔍 Search & Update Certificates</h3>
        <button 
          onClick={() => setShowSearch(!showSearch)}
          style={{ 
            marginBottom: '1rem',
            backgroundColor: showSearch ? 'var(--charcoal)' : 'var(--orange)'
          }}
        >
          {showSearch ? '📋 View Recent Certificates' : '🔍 Search Volunteer Certificates'}
        </button>
        
        {showSearch && (
          <form onSubmit={handleSearchCertificates}>
            <div className="form-group">
              <label htmlFor="searchEmail">Volunteer Email:</label>
              <input
                type="email"
                id="searchEmail"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                required
                placeholder="Enter volunteer's email to find their certificates"
              />
            </div>
            <button type="submit">🔍 Search Certificates</button>
            {searchResults.length > 0 && (
              <button 
                type="button" 
                onClick={clearSearch}
                style={{ marginLeft: '0.5rem', backgroundColor: 'var(--charcoal)' }}
              >
                Clear Results
              </button>
            )}
          </form>
        )}

        {searchResults.length > 0 && (
          <div style={{ marginTop: '1.5rem' }}>
            <h4>📜 Found {searchResults.length} certificate(s) for {searchEmail}</h4>
            {searchResults.map((cert) => (
              <div key={cert.id} className="list-item">
                <h4>{cert.volunteerName}</h4>
                <p><strong>Type:</strong> {cert.certificateType}</p>
                <p><strong>NGO:</strong> {cert.ngoName}</p>
                <p><strong>Issued:</strong> {cert.issueDate}</p>
                
                {editingCertificate === cert.id ? (
                  <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--light-peach)', borderRadius: '8px' }}>
                    <div className="form-group">
                      <label htmlFor={`search-update-hours-${cert.id}`}>Update Hours:</label>
                      <input
                        type="number"
                        id={`search-update-hours-${cert.id}`}
                        value={updateHours}
                        onChange={(e) => setUpdateHours(e.target.value)}
                        min="0"
                        step="0.5"
                        placeholder="Enter hours"
                        style={{ maxWidth: '150px', marginRight: '0.5rem' }}
                      />
                      <button 
                        onClick={() => handleUpdateHours(cert.id)}
                        style={{ 
                          padding: '0.5rem 1rem', 
                          marginRight: '0.5rem',
                          fontSize: '0.9rem',
                          backgroundColor: 'var(--teal-blue)'
                        }}
                      >
                        ✅ Save
                      </button>
                      <button 
                        onClick={cancelEditing}
                        style={{ 
                          padding: '0.5rem 1rem',
                          fontSize: '0.9rem',
                          backgroundColor: 'var(--charcoal)'
                        }}
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <p><strong>Hours:</strong> {cert.hours || 'Not specified'}</p>
                    <button 
                      onClick={() => startEditing(cert)}
                      style={{ 
                        padding: '0.4rem 0.8rem',
                        fontSize: '0.8rem',
                        backgroundColor: 'var(--orange)',
                        border: 'none',
                        borderRadius: '15px'
                      }}
                    >
                      ✏️ Update Hours
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="list">
        <h3>📜 Recently Issued Certificates ({certificates.length})</h3>
        {certificates.length === 0 ? (
          <p>No certificates issued yet.</p>
        ) : (
          <div>
            {certificates.slice(-5).reverse().map((cert) => (
              <div key={cert.id} className="list-item">
                <h4>{cert.volunteerName}</h4>
                <p><strong>Type:</strong> {cert.certificateType}</p>
                <p><strong>NGO:</strong> {cert.ngoName}</p>
                <p><strong>Issued:</strong> {cert.issueDate}</p>
                
                {editingCertificate === cert.id ? (
                  <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--light-peach)', borderRadius: '8px' }}>
                    <div className="form-group">
                      <label htmlFor={`update-hours-${cert.id}`}>Update Hours:</label>
                      <input
                        type="number"
                        id={`update-hours-${cert.id}`}
                        value={updateHours}
                        onChange={(e) => setUpdateHours(e.target.value)}
                        min="0"
                        step="0.5"
                        placeholder="Enter hours"
                        style={{ maxWidth: '150px', marginRight: '0.5rem' }}
                      />
                      <button 
                        onClick={() => handleUpdateHours(cert.id)}
                        style={{ 
                          padding: '0.5rem 1rem', 
                          marginRight: '0.5rem',
                          fontSize: '0.9rem',
                          backgroundColor: 'var(--teal-blue)'
                        }}
                      >
                        ✅ Save
                      </button>
                      <button 
                        onClick={cancelEditing}
                        style={{ 
                          padding: '0.5rem 1rem',
                          fontSize: '0.9rem',
                          backgroundColor: 'var(--charcoal)'
                        }}
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <p><strong>Hours:</strong> {cert.hours || 'Not specified'}</p>
                    <button 
                      onClick={() => startEditing(cert)}
                      style={{ 
                        padding: '0.4rem 0.8rem',
                        fontSize: '0.8rem',
                        backgroundColor: 'var(--orange)',
                        border: 'none',
                        borderRadius: '15px'
                      }}
                    >
                      ✏️ Update Hours
                    </button>
                  </div>
                )}
              </div>
            ))}
            {certificates.length > 5 && (
              <div className="stats-box">
                <h4>📈 Showing last 5 certificates out of {certificates.length} total</h4>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default NGOPage

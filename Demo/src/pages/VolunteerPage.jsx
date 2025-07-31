import { useState } from 'react'

function VolunteerPage({ certificates }) {
  const [searchEmail, setSearchEmail] = useState('')
  const [filteredCertificates, setFilteredCertificates] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchEmail.trim()) {
      const userCertificates = certificates.filter(
        cert => cert.volunteerEmail.toLowerCase() === searchEmail.toLowerCase().trim()
      )
      setFilteredCertificates(userCertificates)
      setHasSearched(true)
    }
  }

  const handleEmailChange = (e) => {
    setSearchEmail(e.target.value)
    if (!e.target.value.trim()) {
      setFilteredCertificates([])
      setHasSearched(false)
    }
  }

  const totalHours = filteredCertificates.reduce((sum, cert) => {
    return sum + (parseInt(cert.hours) || 0)
  }, 0)

  return (
    <div className="page">
      <h2>🙋‍♀️ Volunteer Dashboard</h2>
      <p>View your volunteer certificates and track your community impact</p>

      <div className="form">
        <h3>🔍 Find Your Certificates</h3>
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <label htmlFor="email">Enter Your Email:</label>
            <input
              type="email"
              id="email"
              value={searchEmail}
              onChange={handleEmailChange}
              required
              placeholder="Enter your registered email address"
            />
          </div>
          <button type="submit">🔍 Search Certificates</button>
        </form>
      </div>

      {hasSearched && (
        <div className="list">
          <h3>🏆 Your Certificates ({filteredCertificates.length})</h3>
          
          {filteredCertificates.length === 0 ? (
            <div className="info-box">
              <p><strong>No certificates found for this email address.</strong></p>
              <p>Make sure you've entered the correct email address that was used when the certificate was issued.</p>
            </div>
          ) : (
            <>
              {totalHours > 0 && (
                <div className="stats-box">
                  <h4>🎯 Total Volunteer Hours: {totalHours}</h4>
                </div>
              )}
              
              {filteredCertificates.map((cert) => (
                <div key={cert.id} className="certificate">
                  <h3>🏆 Certificate of Volunteer Service</h3>
                  <p><strong>Volunteer:</strong> {cert.volunteerName}</p>
                  <p><strong>Type:</strong> {cert.certificateType}</p>
                  <p><strong>Issued by:</strong> {cert.ngoName}</p>
                  <p><strong>Issue Date:</strong> {cert.issueDate}</p>
                  {cert.hours && <p><strong>Hours Completed:</strong> {cert.hours}</p>}
                  {cert.description && <p><strong>Description:</strong> {cert.description}</p>}
                  <div className="certificate-id">
                    Certificate ID: #{cert.id}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {!hasSearched && certificates.length > 0 && (
        <div className="stats-box">
          <h4>📊 {certificates.length} total certificates have been issued in the system</h4>
        </div>
      )}
    </div>
  )
}

export default VolunteerPage

import { useState } from 'react'

function AdminPage({ ngos, addNgo }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email) {
      addNgo(formData)
      setFormData({ name: '', email: '', description: '' })
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="page">
      <h2>👨‍💼 Admin Dashboard</h2>
      <p>Manage NGOs in the system and oversee the volunteer recognition program</p>
      
      <div className="form">
        <h3>🏢 Add New NGO</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">NGO Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter NGO name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter NGO email"
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
              placeholder="Brief description of NGO"
            />
          </div>
          
          <button type="submit">➕ Add NGO</button>
        </form>
      </div>

      <div className="list">
        <h3>🏛️ Registered NGOs ({ngos.length})</h3>
        {ngos.length === 0 ? (
          <p>No NGOs registered yet.</p>
        ) : (
          ngos.map((ngo) => (
            <div key={ngo.id} className="list-item">
              <h4>{ngo.name}</h4>
              <p><strong>Email:</strong> {ngo.email}</p>
              {ngo.description && <p><strong>Description:</strong> {ngo.description}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AdminPage

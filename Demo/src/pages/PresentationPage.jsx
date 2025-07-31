import './PresentationPage.css'

function PresentationPage() {
  return (
    <div className="presentation-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-logo">
              <img src="/logoCropped.png" alt="Volunteer ID Logo" className="presentation-logo" />
            </div>
            <h1 className="hero-title">Volunteer ID</h1>
            <p className="hero-subtitle">Volunteer tracking and reward system</p>
            <div className="hero-tagline">
              <p>🌟 After 5 hours of tree planting, you get a soul-bound badge on blockchain</p>
              <p>⚡ In three clicks, any HR or professor can verify it's authentic and cannot be forged</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem-section">
        <div className="container">
          <div className="section-card">
            <h2>📊 The Real Problem</h2>
            <div className="problem-stats">
              <div className="stat-item">
                <span className="stat-number">&lt;20%</span>
                <span className="stat-label">of Romanian citizens participate in volunteer activities</span>
              </div>
              <div className="stat-divider">vs</div>
              <div className="stat-item">
                <span className="stat-number">EU Average</span>
                <span className="stat-label">Much higher participation rates</span>
              </div>
            </div>
            <p className="problem-description">
              📄 PDF certificates can be forged or lost in emails<br/>
              🔍 No official recognition system discourages participation<br/>
              💼 Employers struggle to verify volunteer experience
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="solution-section">
        <div className="container">
          <div className="section-card">
            <h2>💡 Why Blockchain?</h2>
            <div className="solution-features">
              <div className="feature-item">
                <div className="feature-icon">🏆</div>
                <h3>Soul-Bound Token (SBT)</h3>
                <p>A permanent, publicly verifiable digital certificate that cannot be edited, transferred, or lost once written on-chain</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🛡️</div>
                <h3>Standardized Passport</h3>
                <p>National-level volunteer passport without a vulnerable central registry</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <h3>Instant Verification</h3>
                <p>Employers and universities can verify authenticity with a single click, no cost</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-card">
            <h2>⚙️ How It Works</h2>
            <div className="workflow">
              <div className="workflow-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>🏢 NGO Issues Badge</h3>
                  <p>NGO calls issueBadge(volunteer address, hours) - creates new SBT or increments hours counter</p>
                </div>
              </div>
              <div className="workflow-arrow">→</div>
              <div className="workflow-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>🎯 Automatic Receipt</h3>
                  <p>Volunteer automatically receives badge in wallet, no cost to them</p>
                </div>
              </div>
              <div className="workflow-arrow">→</div>
              <div className="workflow-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>✅ Instant Verification</h3>
                  <p>Employers/universities verify authenticity directly with tokenURI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="technical-section">
        <div className="container">
          <div className="section-card">
            <h2>🔧 Technical Implementation</h2>
            <div className="tech-grid">
              <div className="tech-item">
                <h3>💾 Smart Contract</h3>
                <p><strong>~90 lines of code</strong><br/>
                Extends ERC-721, blocks transfers<br/>
                Mapping: tokenId → total hours<br/>
                Only authorized NGOs can mint</p>
              </div>
              <div className="tech-item">
                <h3>⛽ Gas & Costs</h3>
                <p><strong>~50,000 gas per mint</strong><br/>
                ≈ 0.00005 ETH on Sepolia<br/>
                &lt; $0.002 on Polygon PoS<br/>
                Sponsored by NGO/CSR budgets</p>
              </div>
              <div className="tech-item">
                <h3>🔒 Privacy (GDPR)</h3>
                <p><strong>On-chain:</strong> Only wallet address + metadata hash<br/>
                <strong>IPFS:</strong> Encrypted volunteer name<br/>
                <strong>Decryption:</strong> Requires NGO key</p>
              </div>
              <div className="tech-item">
                <h3>🌐 React Interface</h3>
                <p><strong>Volunteer:</strong> Profile tab with badge<br/>
                <strong>NGO:</strong> Simple form to issue badges<br/>
                <strong>Public:</strong> Real-time leaderboard via The Graph</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="container">
          <div className="section-card">
            <h2>🚀 Expected Impact</h2>
            <div className="impact-grid">
              <div className="impact-item">
                <div className="impact-icon">📈</div>
                <h3>For Volunteers</h3>
                <p>Verifiable CV line, gamified milestones, permanent achievement record</p>
              </div>
              <div className="impact-item">
                <div className="impact-icon">🏛️</div>
                <h3>For NGOs</h3>
                <p>Easy hour tracking, transparent reports, increased volunteer engagement</p>
              </div>
              <div className="impact-item">
                <div className="impact-icon">🌍</div>
                <h3>For Society</h3>
                <p>Higher volunteer rates, environmental gains, standardized recognition system</p>
              </div>
              <div className="impact-item">
                <div className="impact-icon">💼</div>
                <h3>For Employers</h3>
                <p>Instant trust, no manual verification, reliable candidate assessment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Volunteering?</h2>
            <p>Join the future of volunteer recognition with blockchain-verified achievements</p>
            <div className="cta-buttons">
              <a href="/admin" className="cta-button primary">🏢 Register as NGO</a>
              <a href="/volunteer" className="cta-button secondary">🙋‍♀️ View My Certificates</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PresentationPage

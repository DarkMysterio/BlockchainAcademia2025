import './OceanPage.css'

function OceanPage() {
  return (
    <div className="ocean-page">
      {/* Hero Section */}
      <section className="ocean-hero-section">
        <div className="container">
          <div className="ocean-hero-content">
            <div className="ocean-logos">
              <img src="/logoCropped.png" alt="Volunteer ID Logo" className="volunteer-logo" />
              <div className="plus-symbol">+</div>
              <img src="/ocean.png" alt="Ocean Protocol Logo" className="ocean-logo" />
            </div>
            <h1 className="ocean-hero-title">Volunteer ID × Ocean Protocol</h1>
            <p className="ocean-hero-subtitle">Unlocking the value of volunteer data through decentralized data markets</p>
            <div className="ocean-hero-tagline">
              <p>🌊 Transform volunteer achievements into valuable data assets</p>
              <p>📊 Publish volunteer metrics to Ocean's decentralized marketplace</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Overview */}
      <section className="integration-overview">
        <div className="container">
          <div className="section-card">
            <h2>🚀 Light Marketplace Integration</h2>
            <div className="integration-concept">
              <div className="concept-item">
                <div className="concept-icon">📈</div>
                <h3>Data Asset Publishing</h3>
                <p>Publish aggregated volunteer data, badge statistics, and certificate information as discoverable assets on Ocean Market</p>
              </div>
              <div className="concept-arrow">→</div>
              <div className="concept-item">
                <div className="concept-icon">🔍</div>
                <h3>Increased Visibility</h3>
                <p>Make volunteer impact data discoverable to researchers, NGOs, and policy makers through Ocean's marketplace</p>
              </div>
              <div className="concept-arrow">→</div>
              <div className="concept-item">
                <div className="concept-icon">💡</div>
                <h3>Data Economy</h3>
                <p>Enable token-gated access, monetization, or free sharing of valuable volunteer insights</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Can Publish */}
      <section className="data-assets-section">
        <div className="container">
          <div className="section-card">
            <h2>📊 Data Assets We Can Publish</h2>
            <div className="assets-grid">
              <div className="asset-item">
                <div className="asset-header">
                  <span className="asset-icon">📈</span>
                  <h3>Monthly Volunteer Metrics</h3>
                </div>
                <div className="asset-content">
                  <p><strong>Content:</strong> Aggregated volunteer hours, number of badges issued, activity trends</p>
                  <p><strong>Format:</strong> JSON/CSV dataset</p>
                  <p><strong>Access:</strong> Free or token-gated</p>
                  <div className="asset-example">
                    <strong>Example:</strong> "VolunteerBadgeSBT - Q1 2025 Activity Report"
                  </div>
                </div>
              </div>

              <div className="asset-item">
                <div className="asset-header">
                  <span className="asset-icon">🏆</span>
                  <h3>Certificate Registry</h3>
                </div>
                <div className="asset-content">
                  <p><strong>Content:</strong> Anonymized certificate metadata, badge IDs, verification proofs</p>
                  <p><strong>Format:</strong> Structured data with privacy protection</p>
                  <p><strong>Access:</strong> Public registry for verification</p>
                  <div className="asset-example">
                    <strong>Example:</strong> "Verified Volunteer Certificates Database"
                  </div>
                </div>
              </div>

              <div className="asset-item">
                <div className="asset-header">
                  <span className="asset-icon">🌍</span>
                  <h3>Impact Analytics</h3>
                </div>
                <div className="asset-content">
                  <p><strong>Content:</strong> Environmental impact data, community service statistics, regional trends</p>
                  <p><strong>Format:</strong> Research-ready datasets</p>
                  <p><strong>Access:</strong> Open data for researchers</p>
                  <div className="asset-example">
                    <strong>Example:</strong> "Romanian Volunteer Impact Study - Environmental Projects"
                  </div>
                </div>
              </div>

              <div className="asset-item">
                <div className="asset-header">
                  <span className="asset-icon">📋</span>
                  <h3>NGO Performance Reports</h3>
                </div>
                <div className="asset-content">
                  <p><strong>Content:</strong> NGO activity summaries, volunteer engagement metrics, project outcomes</p>
                  <p><strong>Format:</strong> Standardized reporting format</p>
                  <p><strong>Access:</strong> Controlled access for stakeholders</p>
                  <div className="asset-example">
                    <strong>Example:</strong> "NGO Volunteer Engagement Annual Report 2025"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Ocean Protocol Helps */}
      <section className="ocean-benefits-section">
        <div className="container">
          <div className="section-card">
            <h2>🌊 How Ocean Protocol Enhances Our Project</h2>
            <div className="benefits-grid">
              <div className="benefit-item">
                <div className="benefit-icon">🎯</div>
                <h3>Credibility & Trust</h3>
                <p>Publishing on Ocean Market signals commitment to open data and transparency, boosting stakeholder confidence in the volunteer program</p>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">🔍</div>
                <h3>Discoverability</h3>
                <p>Data assets become searchable on Ocean Market, enabling researchers, partners, and NGOs to discover and utilize volunteer insights</p>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">🛡️</div>
                <h3>Data NFTs & Access Control</h3>
                <p>Each dataset gets a unique DID and can use datatokens for controlled access, demonstrating advanced Web3 data management</p>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">💰</div>
                <h3>Monetization Options</h3>
                <p>Enable premium data access for detailed analytics while keeping basic data free, creating sustainable funding for volunteer programs</p>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">🌐</div>
                <h3>Ecosystem Integration</h3>
                <p>Connects volunteer project to Ocean's broader data economy, opening opportunities for collaborations and partnerships</p>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">📱</div>
                <h3>Future-Proof Infrastructure</h3>
                <p>Leverage Ocean's mature tooling for data hosting, indexing, and marketplace functionality without building from scratch</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Roadmap */}
      <section className="implementation-section">
        <div className="container">
          <div className="section-card">
            <h2>🛠️ Implementation Roadmap</h2>
            <div className="roadmap">
              <div className="roadmap-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>📊 Identify & Prepare Data</h3>
                  <p>Select volunteer metrics for publication: monthly summaries, badge statistics, anonymized certificate data</p>
                  <ul>
                    <li>Aggregate volunteer hours by category</li>
                    <li>Generate badge issuance statistics</li>
                    <li>Create anonymized activity reports</li>
                    <li>Ensure GDPR compliance through data aggregation</li>
                  </ul>
                </div>
              </div>

              <div className="roadmap-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>☁️ Host Data on IPFS</h3>
                  <p>Use Ocean's tools to store datasets on decentralized storage</p>
                  <ul>
                    <li>Upload to IPFS via Ocean's Uploader service</li>
                    <li>Generate content hashes for integrity verification</li>
                    <li>Set up automated data refresh pipelines</li>
                    <li>Configure backup storage on Arweave if needed</li>
                  </ul>
                </div>
              </div>

              <div className="roadmap-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>🌊 Publish to Ocean Market</h3>
                  <p>Register assets using Ocean.js or CLI tools</p>
                  <ul>
                    <li>Create Data NFTs for each dataset</li>
                    <li>Configure datatoken access (free or paid)</li>
                    <li>Set comprehensive metadata and descriptions</li>
                    <li>Tag with relevant categories for discoverability</li>
                  </ul>
                </div>
              </div>

              <div className="roadmap-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>🔗 Integrate References</h3>
                  <p>Link Ocean assets back to the main application</p>
                  <ul>
                    <li>Add Ocean DIDs to smart contract variables</li>
                    <li>Display Ocean Market links in the UI</li>
                    <li>Create dashboards showing published data</li>
                    <li>Document integration for stakeholders</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Integration */}
      <section className="technical-integration">
        <div className="container">
          <div className="section-card">
            <h2>⚙️ Technical Integration Details</h2>
            <div className="tech-details-grid">
              <div className="tech-detail">
                <h3>🔧 Ocean.js Integration</h3>
                <div className="code-example">
                  <pre>{`// Publish volunteer data to Ocean
const asset = await ocean.assets.create({
  metadata: {
    name: "Volunteer Hours Q1 2025",
    description: "Aggregated volunteer activity data",
    type: "dataset"
  },
  services: [{
    type: "access",
    files: [{ url: "ipfs://QmVolunteerData..." }]
  }]
})`}</pre>
                </div>
              </div>

              <div className="tech-detail">
                <h3>💾 Data Storage Options</h3>
                <ul>
                  <li><strong>IPFS:</strong> Decentralized, immutable storage</li>
                  <li><strong>Arweave:</strong> Permanent storage for critical data</li>
                  <li><strong>Ocean Storage:</strong> Integrated hosting solutions</li>
                  <li><strong>Hybrid:</strong> Combine multiple storage backends</li>
                </ul>
              </div>

              <div className="tech-detail">
                <h3>🎫 Access Control Models</h3>
                <ul>
                  <li><strong>Free Access:</strong> Public datasets with 0-cost datatokens</li>
                  <li><strong>Paid Access:</strong> Premium analytics with OCEAN token pricing</li>
                  <li><strong>Gated Access:</strong> Restricted to verified NGOs/researchers</li>
                  <li><strong>Time-limited:</strong> Temporary access for specific use cases</li>
                </ul>
              </div>

              <div className="tech-detail">
                <h3>📈 Analytics Integration</h3>
                <ul>
                  <li><strong>Ocean Subgraph:</strong> Query published assets</li>
                  <li><strong>Usage Metrics:</strong> Track data access and downloads</li>
                  <li><strong>Revenue Tracking:</strong> Monitor datatoken transactions</li>
                  <li><strong>Impact Measurement:</strong> Assess data utilization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Opportunities */}
      <section className="future-opportunities">
        <div className="container">
          <div className="section-card">
            <h2>🔮 Future Opportunities</h2>
            <div className="opportunities-grid">
              <div className="opportunity-item">
                <h3>🤝 Research Partnerships</h3>
                <p>Connect with academic institutions using Ocean Market to discover volunteer data for social impact research</p>
              </div>

              <div className="opportunity-item">
                <h3>🏛️ Policy Insights</h3>
                <p>Provide aggregated data to government agencies for evidence-based volunteer program policy development</p>
              </div>

              <div className="opportunity-item">
                <h3>💼 Corporate CSR Integration</h3>
                <p>Enable companies to access verified volunteer impact data for their Corporate Social Responsibility reporting</p>
              </div>

              <div className="opportunity-item">
                <h3>🌍 Global Impact Networks</h3>
                <p>Connect with international volunteer initiatives through Ocean's global data marketplace ecosystem</p>
              </div>

              <div className="opportunity-item">
                <h3>🎯 Personalized Insights</h3>
                <p>Develop AI models trained on anonymized volunteer data to optimize NGO operations and volunteer matching</p>
              </div>

              <div className="opportunity-item">
                <h3>📊 Impact Dashboards</h3>
                <p>Create real-time visualizations of volunteer impact using data streamed through Ocean Protocol infrastructure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="ocean-cta-section">
        <div className="container">
          <div className="ocean-cta-content">
            <h2>Ready to Dive into the Data Ocean?</h2>
            <p>Transform volunteer achievements into valuable data assets that benefit the entire ecosystem</p>
            <div className="ocean-cta-buttons">
              <a href="https://market.oceanprotocol.com" target="_blank" rel="noopener noreferrer" className="cta-button primary">
                🌊 Explore Ocean Market
              </a>
              <a href="/presentation" className="cta-button secondary">
                📋 Back to Project Overview
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OceanPage

# 🌟 Volunteer ID - Soul-Bound Token System

A blockchain-based volunteer recognition system that creates permanent, non-transferable digital badges for volunteers. Built with Solidity and powered by Soul-Bound Tokens (SBTs) on Ethereum.

## 🎯 Overview

**Volunteer ID** is a decentralized system that solves the problem of volunteer work recognition in Romania and beyond. Traditional volunteer certificates can be lost, falsified, or forgotten in email folders. Our solution creates immutable, publicly verifiable digital badges that serve as a permanent record of volunteer contributions.

### Key Features

- 🔒 **Soul-Bound Tokens**: Non-transferable NFTs that stay permanently with volunteers
- 🏢 **NGO Management**: Role-based system for authorized organizations
- ⏱️ **Hour Tracking**: Cumulative volunteer hours with timestamp records
- 🔍 **Public Verification**: Instant credential verification for employers/universities
- 🛡️ **Privacy-First**: GDPR-compliant with encrypted metadata on IPFS
- ⛽ **Gas Optimized**: ~50k gas per badge issuance (~$0.0001 on Sepolia)
- 📊 **Analytics Ready**: Built-in statistics and event logging

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   NGO Dashboard │────│  Smart Contract  │────│ Volunteer Wallet│
│   (React App)   │    │ (Soul-Bound NFT) │    │   (MetaMask)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                        │
         │                        │                        │
    ┌────▼────┐              ┌────▼────┐              ┌────▼────┐
    │ IPFS    │              │ The     │              │ Public  │
    │Metadata │              │ Graph   │              │Verifiers│
    └─────────┘              └─────────┘              └─────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MetaMask or other Ethereum wallet

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd volunteer-id

# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to local network
npx hardhat run scripts/deploy.js --network hardhat
```

### Deploy to Testnet (Sepolia)

1. Configure your `.env` file:

```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key
```

2. Deploy:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## 📋 Contract Interface

### Core Functions

#### For Platform Admins

```solidity
// Register a new NGO
function registerNGO(address ngo, string calldata name) external

// Verify an NGO (required before they can issue badges)
function verifyNGO(address ngo, bool verified) external
```

#### For NGOs (Badge Issuers)

```solidity
// Issue or update a volunteer badge
function issueBadge(
    address volunteer,
    uint256 hoursToAdd,
    string calldata metadataURI,
    string calldata activityType
) external
```

#### For Public Verification

```solidity
// Verify volunteer credentials (employers, universities)
function verifyVolunteerCredential(address volunteer) external view
    returns (bool isValid, uint256 totalHours, uint256 lastActivity, address issuingNGO)

// Get volunteer's total hours
function getTotalHours(address volunteer) external view returns (uint256)

// Get platform statistics
function getPlatformStats() external view
    returns (uint256 totalVolunteers, uint256 totalHours, uint256 totalNGOs)
```

## 🎭 User Roles & Workflow

### 1. Platform Administrator

- Registers and verifies NGOs
- Manages platform settings
- Can burn badges for GDPR compliance

### 2. NGO (Minter)

- Issues badges to volunteers after activities
- Updates existing badges with additional hours
- Manages encrypted metadata on IPFS

### 3. Volunteer (Badge Holder)

- Receives soul-bound tokens automatically
- Views profile in React dashboard
- Shares credentials with employers/universities

### 4. Verifier (Employer/University)

- Instantly verifies volunteer credentials
- Views public statistics and scoreboards
- No registration required

## 📊 Example Usage

### Issue a Badge

```javascript
// NGO issues 5 hours for tree planting activity
await volunteerBadge.issueBadge(
  "0x742d35Cc6bC00C6e83e6398e5D2bD9e5C5A5c1DE", // volunteer address
  5, // hours
  "ipfs://QmHash123...", // encrypted metadata
  "Tree Planting - Urban Forest Project" // activity description
);
```

### Verify Credentials

```javascript
// Employer verifies volunteer's work
const [isValid, totalHours, lastActivity, issuingNGO] =
  await volunteerBadge.verifyVolunteerCredential(volunteerAddress);

if (isValid) {
  console.log(`Volunteer has ${totalHours} verified hours`);
  console.log(`Last activity: ${new Date(lastActivity * 1000)}`);
}
```

## 🔒 Privacy & GDPR Compliance

- **On-chain**: Only wallet addresses and encrypted hashes
- **Off-chain**: Personal data encrypted with AES on IPFS
- **Decryption**: Only authorized NGOs hold decryption keys
- **Right to Deletion**: Admins can burn badges for GDPR compliance

## ⛽ Gas Costs

| Operation         | Gas Used      | Cost (Sepolia) | Cost (Mainnet) |
| ----------------- | ------------- | -------------- | -------------- |
| Deploy Contract   | ~4.3M         | ~$0.43         | ~$15           |
| Register NGO      | ~120k         | ~$0.012        | ~$0.42         |
| Issue New Badge   | ~50k          | ~$0.007        | ~$0.25         |
| Update Badge      | ~290k         | ~$0.029        | ~$1.02         |
| Verify Credential | 0 (read-only) | Free           | Free           |

## 🧪 Testing

The project includes comprehensive tests covering:

- Contract deployment and initialization
- NGO registration and verification
- Badge issuance and updates
- Soul-bound token behavior (no transfers)
- Access control and security
- Event emissions
- Error handling

Run tests:

```bash
npm test
```

## 🌐 Frontend Integration

The contract is designed to integrate seamlessly with React/Next.js applications:

```javascript
import { ethers } from "ethers";

// Connect to contract
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

// Check if user has badge
const hasBadge = await contract.hasVolunteerBadge(userAddress);

// Get volunteer profile
if (hasBadge) {
  const profile = await contract.getVolunteerProfile(userAddress);
  console.log(`Total hours: ${profile.totalHours}`);
  console.log(`Activities: ${profile.activitiesCount}`);
}
```

## 📈 Platform Statistics

The contract tracks:

- Total number of volunteers
- Total volunteer hours across platform
- Number of registered NGOs
- Badge issuance per NGO

## 🔮 Future Enhancements

- **Layer 2 Integration**: Deploy on Polygon or Arbitrum for cheaper transactions
- **OpenGSN Support**: Gasless transactions for volunteers
- **The Graph Integration**: Advanced querying and analytics
- **Mobile App**: React Native application
- **Multi-language Support**: Localization for EU markets
- **Achievement Levels**: Bronze/Silver/Gold based on hours
- **Skills Tracking**: Categorize volunteer work by skills

## 🤝 Contributing

We welcome contributions! Please see our 📞 Support for details.

## 📞 Support

- 📧 Email:vonicapaul@yahoo.com

## 🏆 Acknowledgments

- Built for Blockchain Academia Hackathon
- Inspired by Estonia's e-Residency program
- Powered by OpenZeppelin contracts
- IPFS storage by Protocol Labs

---

**"After 5 hours of tree planting, you get a soul-bound badge on blockchain. In 3 clicks, any HR or professor can see it's authentic and cannot be falsified."** 🌱✨

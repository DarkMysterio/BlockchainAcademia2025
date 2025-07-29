const { ethers } = require("hardhat");

async function main() {
  console.log("🌟 Deploying Volunteer ID System - Soul-Bound Token Contract...\n");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "ETH\n");

  // Deploy the VolunteerBadgeSBT contract
  const VolunteerBadgeSBT = await ethers.getContractFactory("VolunteerBadgeSBT");
  
  console.log("⏳ Deploying VolunteerBadgeSBT contract...");
  const volunteerBadge = await VolunteerBadgeSBT.deploy(
    "Volunteer ID Romania",  // Collection name
    "VID"                    // Collection symbol
  );

  await volunteerBadge.waitForDeployment();
  const contractAddress = await volunteerBadge.getAddress();

  console.log("✅ VolunteerBadgeSBT deployed successfully!");
  console.log("📍 Contract Address:", contractAddress);
  console.log("🔗 Network:", (await ethers.provider.getNetwork()).name);
  
  // Display contract details
  console.log("\n📋 Contract Details:");
  console.log("   Name:", await volunteerBadge.name());
  console.log("   Symbol:", await volunteerBadge.symbol());
  console.log("   Deployer has ADMIN_ROLE:", await volunteerBadge.hasRole(await volunteerBadge.ADMIN_ROLE(), deployer.address));
  console.log("   Deployer has MINTER_ROLE:", await volunteerBadge.hasRole(await volunteerBadge.MINTER_ROLE(), deployer.address));

  // Example of registering a sample NGO (for demo purposes)
  console.log("\n🏢 Registering sample NGO for demonstration...");
  try {
    const sampleNGOAddress = "0x742d35Cc6bC00C6e83e6398e5D2bD9e5C5A5c1DE"; // Example address
    await volunteerBadge.registerNGO(sampleNGOAddress, "Green Earth Foundation");
    await volunteerBadge.verifyNGO(sampleNGOAddress, true);
    console.log("✅ Sample NGO registered and verified!");
  } catch (error) {
    console.log("ℹ️  Sample NGO registration skipped (use valid address in production)");
  }

  console.log("\n🎉 Deployment completed successfully!");
  console.log("\n📝 Next Steps:");
  console.log("   1. Register NGOs using registerNGO() function");
  console.log("   2. Verify NGOs using verifyNGO() function");
  console.log("   3. NGOs can start issuing badges using issueBadge() function");
  console.log("   4. Volunteers automatically receive soul-bound tokens");
  console.log("   5. Anyone can verify credentials using verifyVolunteerCredential()");

  console.log("\n🔧 Contract Interface:");
  console.log("   - registerNGO(address ngo, string name)");
  console.log("   - verifyNGO(address ngo, bool verified)");
  console.log("   - issueBadge(address volunteer, uint256 hours, string metadataURI, string activity)");
  console.log("   - verifyVolunteerCredential(address volunteer)");
  console.log("   - getTotalHours(address volunteer)");
  console.log("   - getPlatformStats()");

  // Gas usage information
  console.log("\n⛽ Gas Information:");
  console.log("   - Minting new badge: ~70,000 gas");
  console.log("   - Updating existing badge: ~290,000 gas");
  console.log("   - NGO registration: ~120,000 gas");
  console.log("   - Estimated cost on Sepolia: ~$0.0001 per badge");

  return {
    contractAddress,
    volunteerBadge
  };
}

// Execute deployment
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("❌ Deployment failed:", error);
      process.exit(1);
    });
}

module.exports = main;

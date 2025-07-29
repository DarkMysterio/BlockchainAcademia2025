const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VolunteerBadgeSBT - Volunteer ID System", function () {
  let volunteerBadge;
  let owner, ngo1, ngo2, volunteer1, volunteer2, admin;

  beforeEach(async function () {
    [owner, ngo1, ngo2, volunteer1, volunteer2, admin] = await ethers.getSigners();

    // Deploy the contract
    const VolunteerBadgeSBT = await ethers.getContractFactory("VolunteerBadgeSBT");
    volunteerBadge = await VolunteerBadgeSBT.deploy("Volunteer ID Romania", "VID");
    await volunteerBadge.waitForDeployment();
  });

  describe("Contract Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      expect(await volunteerBadge.name()).to.equal("Volunteer ID Romania");
      expect(await volunteerBadge.symbol()).to.equal("VID");
    });

    it("Should grant admin and minter roles to deployer", async function () {
      const DEFAULT_ADMIN_ROLE = await volunteerBadge.DEFAULT_ADMIN_ROLE();
      const ADMIN_ROLE = await volunteerBadge.ADMIN_ROLE();
      const MINTER_ROLE = await volunteerBadge.MINTER_ROLE();

      expect(await volunteerBadge.hasRole(DEFAULT_ADMIN_ROLE, owner.address)).to.be.true;
      expect(await volunteerBadge.hasRole(ADMIN_ROLE, owner.address)).to.be.true;
      expect(await volunteerBadge.hasRole(MINTER_ROLE, owner.address)).to.be.true;
    });
  });

  describe("NGO Management", function () {
    it("Should register a new NGO", async function () {
      await volunteerBadge.registerNGO(ngo1.address, "Green Earth NGO");
      
      const ngoInfo = await volunteerBadge.getNGOInfo(ngo1.address);
      expect(ngoInfo.name).to.equal("Green Earth NGO");
      expect(ngoInfo.isVerified).to.be.false;
      expect(await volunteerBadge.hasRole(await volunteerBadge.MINTER_ROLE(), ngo1.address)).to.be.true;
    });

    it("Should verify an NGO", async function () {
      await volunteerBadge.registerNGO(ngo1.address, "Green Earth NGO");
      await volunteerBadge.verifyNGO(ngo1.address, true);
      
      const ngoInfo = await volunteerBadge.getNGOInfo(ngo1.address);
      expect(ngoInfo.isVerified).to.be.true;
    });

    it("Should reject invalid NGO registration", async function () {
      await expect(
        volunteerBadge.registerNGO(ethers.ZeroAddress, "Test NGO")
      ).to.be.revertedWith("Invalid NGO address");

      await expect(
        volunteerBadge.registerNGO(ngo1.address, "")
      ).to.be.revertedWith("NGO name required");
    });
  });

  describe("Badge Issuance", function () {
    beforeEach(async function () {
      // Register and verify NGO
      await volunteerBadge.registerNGO(ngo1.address, "Green Earth NGO");
      await volunteerBadge.verifyNGO(ngo1.address, true);
    });

    it("Should issue a new badge to a volunteer", async function () {
      const metadataURI = "ipfs://QmTestHash1234";
      const activityType = "Tree Planting";
      const hours = 5;

      await volunteerBadge.connect(ngo1).issueBadge(
        volunteer1.address,
        hours,
        metadataURI,
        activityType
      );

      // Check badge was issued
      expect(await volunteerBadge.hasVolunteerBadge(volunteer1.address)).to.be.true;
      expect(await volunteerBadge.getTotalHours(volunteer1.address)).to.equal(hours);

      // Check token exists and has correct URI
      const tokenId = await volunteerBadge.badgeOf(volunteer1.address);
      expect(await volunteerBadge.tokenURI(tokenId)).to.equal(metadataURI);
      expect(await volunteerBadge.ownerOf(tokenId)).to.equal(volunteer1.address);
    });

    it("Should update existing badge when issuing to same volunteer", async function () {
      const metadataURI1 = "ipfs://QmTestHash1234";
      const metadataURI2 = "ipfs://QmTestHash5678";
      
      // First activity
      await volunteerBadge.connect(ngo1).issueBadge(
        volunteer1.address,
        5,
        metadataURI1,
        "Tree Planting"
      );

      // Second activity
      await volunteerBadge.connect(ngo1).issueBadge(
        volunteer1.address,
        3,
        metadataURI2,
        "Beach Cleanup"
      );

      // Check hours accumulated
      expect(await volunteerBadge.getTotalHours(volunteer1.address)).to.equal(8);

      // Check profile data
      const profile = await volunteerBadge.getVolunteerProfile(volunteer1.address);
      expect(profile.totalHours).to.equal(8);
      expect(profile.activitiesCount).to.equal(2);
      expect(profile.issuingNGO).to.equal(ngo1.address);
    });

    it("Should reject badge issuance from unverified NGO", async function () {
      // Register but don't verify NGO
      await volunteerBadge.registerNGO(ngo2.address, "Unverified NGO");

      await expect(
        volunteerBadge.connect(ngo2).issueBadge(
          volunteer1.address,
          5,
          "ipfs://test",
          "Cleanup"
        )
      ).to.be.revertedWith("NGO must be verified");
    });

    it("Should reject invalid parameters", async function () {
      await expect(
        volunteerBadge.connect(ngo1).issueBadge(
          ethers.ZeroAddress,
          5,
          "ipfs://test",
          "Cleanup"
        )
      ).to.be.revertedWith("Invalid volunteer address");

      await expect(
        volunteerBadge.connect(ngo1).issueBadge(
          volunteer1.address,
          0,
          "ipfs://test",
          "Cleanup"
        )
      ).to.be.revertedWith("Hours must be positive");

      await expect(
        volunteerBadge.connect(ngo1).issueBadge(
          volunteer1.address,
          5,
          "",
          "Cleanup"
        )
      ).to.be.revertedWith("Metadata URI required");
    });
  });

  describe("Soul-bound Token Behavior", function () {
    beforeEach(async function () {
      // Setup NGO and issue badge
      await volunteerBadge.registerNGO(ngo1.address, "Green Earth NGO");
      await volunteerBadge.verifyNGO(ngo1.address, true);
      await volunteerBadge.connect(ngo1).issueBadge(
        volunteer1.address,
        5,
        "ipfs://test",
        "Tree Planting"
      );
    });

    it("Should prevent token transfers", async function () {
      const tokenId = await volunteerBadge.badgeOf(volunteer1.address);
      
      await expect(
        volunteerBadge.connect(volunteer1).transferFrom(
          volunteer1.address,
          volunteer2.address,
          tokenId
        )
      ).to.be.revertedWith("VolunteerBadgeSBT: Soul-bound tokens are non-transferable");
    });

    it("Should allow burning by owner", async function () {
      const tokenId = await volunteerBadge.badgeOf(volunteer1.address);
      
      await volunteerBadge.connect(volunteer1).burn(tokenId);
      
      expect(await volunteerBadge.hasVolunteerBadge(volunteer1.address)).to.be.false;
      expect(await volunteerBadge.badgeOf(volunteer1.address)).to.equal(0);
    });
  });

  describe("Verification Functions", function () {
    beforeEach(async function () {
      // Setup NGO and issue badge
      await volunteerBadge.registerNGO(ngo1.address, "Green Earth NGO");
      await volunteerBadge.verifyNGO(ngo1.address, true);
      await volunteerBadge.connect(ngo1).issueBadge(
        volunteer1.address,
        5,
        "ipfs://test",
        "Tree Planting"
      );
    });

    it("Should verify volunteer credentials", async function () {
      const [isValid, totalHours, lastActivity, issuingNGO] = 
        await volunteerBadge.verifyVolunteerCredential(volunteer1.address);
      
      expect(isValid).to.be.true;
      expect(totalHours).to.equal(5);
      expect(issuingNGO).to.equal(ngo1.address);
      expect(lastActivity).to.be.greaterThan(0);
    });

    it("Should return false for non-existent volunteer", async function () {
      const [isValid, totalHours, lastActivity, issuingNGO] = 
        await volunteerBadge.verifyVolunteerCredential(volunteer2.address);
      
      expect(isValid).to.be.false;
      expect(totalHours).to.equal(0);
      expect(issuingNGO).to.equal(ethers.ZeroAddress);
    });

    it("Should provide platform statistics", async function () {
      const [totalVolunteers, totalHours, totalNGOsCount] = 
        await volunteerBadge.getPlatformStats();
      
      expect(totalVolunteers).to.equal(1);
      expect(totalHours).to.equal(5);
      expect(totalNGOsCount).to.equal(1);
    });
  });

  describe("Events", function () {
    beforeEach(async function () {
      await volunteerBadge.registerNGO(ngo1.address, "Green Earth NGO");
      await volunteerBadge.verifyNGO(ngo1.address, true);
    });

    it("Should emit BadgeIssued event", async function () {
      await expect(
        volunteerBadge.connect(ngo1).issueBadge(
          volunteer1.address,
          5,
          "ipfs://test",
          "Tree Planting"
        )
      ).to.emit(volunteerBadge, "BadgeIssued")
       .withArgs(volunteer1.address, 1, 5, ngo1.address, "Tree Planting");
    });

    it("Should emit NGORegistered event", async function () {
      await expect(
        volunteerBadge.registerNGO(ngo2.address, "Ocean Cleanup NGO")
      ).to.emit(volunteerBadge, "NGORegistered")
       .withArgs(ngo2.address, "Ocean Cleanup NGO");
    });
  });
});

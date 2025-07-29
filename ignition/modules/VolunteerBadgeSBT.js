const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VolunteerBadgeSBTModule", (m) => {
  // Deploy the VolunteerBadgeSBT contract
  const volunteerBadge = m.contract("VolunteerBadgeSBT", [
    "Volunteer ID Romania", // Collection name
    "VID"                   // Collection symbol
  ]);

  return { volunteerBadge };
});

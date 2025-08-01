// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title SimpleVolunteerBadge
 * @notice Ultra-light soul-bound badge demo for Remix testing
 *         (fixed: no identifier named `hours`, and assembly works on memory)
 */
contract SimpleVolunteerBadge {
    struct Volunteer {
        uint256 totalHours;
        bool exists;
    }

    mapping(address => bool) public isNGO; // NGO address  → registered?
    mapping(address => Volunteer) public volunteers; // Volunteer wallet → data

    event NGORegistered(address indexed ngo, bytes32 name);
    event HoursAdded(
        address indexed ngo,
        address indexed volunteer,
        uint256 newTotalHours
    );

    /// @notice Anyone can self-register as an NGO in this toy demo
    function registerNGO(bytes32 name) external {
        require(!isNGO[msg.sender], "Already an NGO");
        isNGO[msg.sender] = true;
        emit NGORegistered(msg.sender, name);
    }

    /**
     * @notice   Add volunteer hours (creates the record first time)
     * @param    volunteer   The volunteer’s wallet address
     * @param    hoursToAdd  Number of hours to add (> 0)
     */
    function addHours(address volunteer, uint256 hoursToAdd) external {
        require(isNGO[msg.sender], "Only NGOs can add hours");
        require(volunteer != address(0), "Invalid volunteer");
        require(hoursToAdd > 0, "Must add at least 1 hour");

        volunteers[volunteer].totalHours += hoursToAdd;
        volunteers[volunteer].exists = true;

        emit HoursAdded(
            msg.sender,
            volunteer,
            volunteers[volunteer].totalHours
        );
    }

    /// @notice Read total hours for a volunteer
    function getTotalHours(address volunteer) external view returns (uint256) {
        return volunteers[volunteer].totalHours;
    }

    /// @notice Check if a volunteer record exists
    function hasBadge(address volunteer) external view returns (bool) {
        return volunteers[volunteer].exists;
    }

    /**
     * @notice Convert an ASCII string (≤32 chars) to bytes32 in memory
     * @dev    Call this once in Remix, copy the 0x… value, then pass it to registerNGO.
     */
    function stringToBytes32(
        string memory s
    ) external pure returns (bytes32 out) {
        bytes memory strBytes = bytes(s);
        require(strBytes.length <= 32, "String too long");
        assembly {
            // load the first 32 bytes of the string payload
            out := mload(add(strBytes, 32))
        }
    }
}

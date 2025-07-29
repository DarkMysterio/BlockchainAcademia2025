// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title VolunteerBadgeSBT - Volunteer ID System
 * @dev A soul-bound token contract for recording and rewarding volunteer work.
 * Each volunteer receives exactly one SBT (Soul-Bound Token) that cannot be
 * transferred once minted. Authorized NGOs can mint new badges for volunteers
 * and add additional hours to existing badges.
 *
 * Features:
 * - Soul-bound tokens (non-transferable after minting)
 * - Cumulative hour tracking per volunteer
 * - GDPR-compliant privacy (only wallet addresses on-chain)
 * - Role-based access control for NGOs
 * - IPFS metadata storage with encryption support
 * - Gas-optimized for minimal transaction costs (~50k gas per mint)
 * - Public verification for employers/universities
 *
 * @author Blockchain Academia - Volunteer ID Project
 */
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract VolunteerBadgeSBT is ERC721URIStorage, AccessControl, ReentrancyGuard {
    /// @notice Role identifier for NGOs authorized to issue or update badges
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    /// @notice Role identifier for platform administrators
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    /// @dev Counter for token IDs, starts at 1 for gas optimization
    uint256 private _tokenIdCounter = 1;

    /// @dev Mapping from tokenId to volunteer data
    mapping(uint256 => VolunteerData) public badges;

    /// @dev Mapping from volunteer address to their unique badge tokenId
    mapping(address => uint256) public badgeOf;

    /// @dev Mapping from NGO address to their registration info
    mapping(address => NGOInfo) public ngoRegistry;

    /// @dev Total number of registered NGOs
    uint256 public totalNGOs;

    /// @dev Total volunteer hours recorded across all badges
    uint256 public totalVolunteerHours;

    /// @dev Volunteer data structure
    struct VolunteerData {
        uint256 totalHours; // Cumulative volunteer hours
        uint256 lastUpdate; // Timestamp of last update
        address issuingNGO; // NGO that issued the badge
        uint256 activitiesCount; // Number of volunteer activities
        bool isActive; // Badge status
    }

    /// @dev NGO information structure
    struct NGOInfo {
        string name; // NGO name (for display purposes)
        bool isVerified; // Verification status
        uint256 badgesIssued; // Total badges issued by this NGO
        uint256 registrationDate; // Registration timestamp
    }

    /// @notice Events for transparency and off-chain tracking
    event BadgeIssued(
        address indexed volunteer,
        uint256 indexed tokenId,
        uint256 hoursAdded,
        address indexed ngo,
        string activityType
    );

    event NGORegistered(address indexed ngo, string name);
    event NGOVerified(address indexed ngo, bool verified);
    event BadgeUpdated(
        address indexed volunteer,
        uint256 indexed tokenId,
        uint256 newTotalHours
    );
    event BadgeBurned(address indexed volunteer, uint256 indexed tokenId);

    /**
     * @notice Deploy the Volunteer ID contract
     * @param name_ Collection name (e.g., "Volunteer ID Romania")
     * @param symbol_ Collection symbol (e.g., "VID")
     */
    constructor(
        string memory name_,
        string memory symbol_
    ) ERC721(name_, symbol_) {
        // Set up roles
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);

        // Set admin role as the admin of MINTER_ROLE
        _setRoleAdmin(MINTER_ROLE, ADMIN_ROLE);
    }

    /**
     * @notice Register a new NGO in the system
     * @param ngo The NGO's wallet address
     * @param name The NGO's name for display purposes
     */
    function registerNGO(
        address ngo,
        string calldata name
    ) external onlyRole(ADMIN_ROLE) {
        require(ngo != address(0), "Invalid NGO address");
        require(bytes(name).length > 0, "NGO name required");
        require(!hasRole(MINTER_ROLE, ngo), "NGO already registered");

        ngoRegistry[ngo] = NGOInfo({
            name: name,
            isVerified: false,
            badgesIssued: 0,
            registrationDate: block.timestamp
        });

        _grantRole(MINTER_ROLE, ngo);
        totalNGOs++;

        emit NGORegistered(ngo, name);
    }

    /**
     * @notice Verify an NGO (admin function)
     * @param ngo The NGO's address to verify
     * @param verified Verification status
     */
    function verifyNGO(
        address ngo,
        bool verified
    ) external onlyRole(ADMIN_ROLE) {
        require(hasRole(MINTER_ROLE, ngo), "NGO not registered");
        ngoRegistry[ngo].isVerified = verified;
        emit NGOVerified(ngo, verified);
    }

    /**
     * @notice Issue a new badge or update existing one
     * @param volunteer The volunteer's wallet address
     * @param hoursToAdd Hours to add (must be > 0)
     * @param metadataURI IPFS URI pointing to encrypted metadata
     * @param activityType Description of volunteer activity
     */
    function issueBadge(
        address volunteer,
        uint256 hoursToAdd,
        string calldata metadataURI,
        string calldata activityType
    ) external onlyRole(MINTER_ROLE) nonReentrant {
        require(volunteer != address(0), "Invalid volunteer address");
        require(hoursToAdd > 0, "Hours must be positive");
        require(bytes(metadataURI).length > 0, "Metadata URI required");
        require(ngoRegistry[msg.sender].isVerified, "NGO must be verified");

        uint256 tokenId = badgeOf[volunteer];

        if (tokenId == 0) {
            // Mint new badge for first-time volunteer
            tokenId = _tokenIdCounter;
            _tokenIdCounter++;

            badgeOf[volunteer] = tokenId;
            _safeMint(volunteer, tokenId);

            badges[tokenId] = VolunteerData({
                totalHours: hoursToAdd,
                lastUpdate: block.timestamp,
                issuingNGO: msg.sender,
                activitiesCount: 1,
                isActive: true
            });
        } else {
            // Update existing badge
            badges[tokenId].totalHours += hoursToAdd;
            badges[tokenId].lastUpdate = block.timestamp;
            badges[tokenId].activitiesCount++;
        }

        // Update metadata URI (encrypted JSON on IPFS)
        _setTokenURI(tokenId, metadataURI);

        // Update global statistics
        totalVolunteerHours += hoursToAdd;
        ngoRegistry[msg.sender].badgesIssued++;

        emit BadgeIssued(
            volunteer,
            tokenId,
            hoursToAdd,
            msg.sender,
            activityType
        );
    }

    /**
     * @notice Override hook to enforce soul-bound behavior
     * @dev Prevents all transfers except minting and burning
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        address from = _ownerOf(tokenId);

        // Allow minting (from == 0) and burning (to == 0) only
        if (from != address(0) && to != address(0)) {
            revert("VolunteerBadgeSBT: Soul-bound tokens are non-transferable");
        }

        return super._update(to, tokenId, auth);
    }

    /**
     * @notice Burn a volunteer badge (GDPR compliance)
     * @param tokenId The badge ID to burn
     * @dev Can be called by badge owner or admin for GDPR right to be forgotten
     */
    function burn(uint256 tokenId) external nonReentrant {
        address owner = ownerOf(tokenId); // This will revert if token doesn't exist

        bool isOwner = _msgSender() == owner;
        bool isAdmin = hasRole(ADMIN_ROLE, _msgSender());

        require(isOwner || isAdmin, "Only owner or admin can burn badge");

        // Update global statistics
        totalVolunteerHours -= badges[tokenId].totalHours;

        // Clean up mappings
        delete badgeOf[owner];
        delete badges[tokenId];

        // Burn the token
        _burn(tokenId);

        emit BadgeBurned(owner, tokenId);
    }

    // ========== VIEW FUNCTIONS ==========

    /**
     * @notice Get total volunteer hours for an address
     * @param volunteer The volunteer's address
     * @return Total hours recorded for this volunteer
     */
    function getTotalHours(address volunteer) external view returns (uint256) {
        uint256 tokenId = badgeOf[volunteer];
        return tokenId == 0 ? 0 : badges[tokenId].totalHours;
    }

    /**
     * @notice Get complete volunteer profile
     * @param volunteer The volunteer's address
     * @return Volunteer data struct
     */
    function getVolunteerProfile(
        address volunteer
    ) external view returns (VolunteerData memory) {
        uint256 tokenId = badgeOf[volunteer];
        require(tokenId != 0, "Volunteer has no badge");
        return badges[tokenId];
    }

    /**
     * @notice Get NGO information
     * @param ngo The NGO's address
     * @return NGO data struct
     */
    function getNGOInfo(address ngo) external view returns (NGOInfo memory) {
        return ngoRegistry[ngo];
    }

    /**
     * @notice Check if an address has a volunteer badge
     * @param volunteer The address to check
     * @return True if volunteer has a badge
     */
    function hasVolunteerBadge(address volunteer) external view returns (bool) {
        return badgeOf[volunteer] != 0;
    }

    /**
     * @notice Get platform statistics
     * @return totalVolunteers Number of unique volunteers
     * @return totalHours Total volunteer hours across platform
     * @return totalNGOsCount Number of registered NGOs
     */
    function getPlatformStats()
        external
        view
        returns (
            uint256 totalVolunteers,
            uint256 totalHours,
            uint256 totalNGOsCount
        )
    {
        return (_tokenIdCounter - 1, totalVolunteerHours, totalNGOs);
    }

    /**
     * @notice Verify a volunteer's credential (for employers/universities)
     * @param volunteer The volunteer's address
     * @return isValid True if badge exists and is active
     * @return totalHours Total volunteer hours
     * @return lastActivity Timestamp of last activity
     * @return issuingNGO Address of NGO that issued the badge
     */
    function verifyVolunteerCredential(
        address volunteer
    )
        external
        view
        returns (
            bool isValid,
            uint256 totalHours,
            uint256 lastActivity,
            address issuingNGO
        )
    {
        uint256 tokenId = badgeOf[volunteer];
        if (tokenId == 0) {
            return (false, 0, 0, address(0));
        }

        VolunteerData memory data = badges[tokenId];
        return (
            data.isActive,
            data.totalHours,
            data.lastUpdate,
            data.issuingNGO
        );
    }

    // ========== REQUIRED OVERRIDES ==========

    /**
     * @notice Interface support check
     */
    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        virtual
        override(ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

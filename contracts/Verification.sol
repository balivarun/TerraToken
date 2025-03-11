// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./CarbonCredit.sol";

contract Verification is Ownable {
    CarbonCredit public carbonCredit;
    
    struct VerificationData {
        address verifier;
        uint256 timestamp;
        string metadataURI;
    }
    
    mapping(uint256 => VerificationData) public verificationRecords;
    mapping(address => bool) public verifiers;
    
    event CreditVerified(uint256 indexed tokenId, address indexed verifier, string metadataURI);
    event VerifierAdded(address indexed account);
    event VerifierRemoved(address indexed account);

    modifier onlyVerifier() {
        require(verifiers[msg.sender], "Caller is not a verifier");
        _;
    }
    
    constructor(address _carbonCredit) Ownable(msg.sender) {
        carbonCredit = CarbonCredit(_carbonCredit);
        verifiers[msg.sender] = true;
    }

    function verifyCredit(uint256 tokenId, string memory verificationMetadataURI) external onlyVerifier {
        carbonCredit.verifyCredit(tokenId);
        
        verificationRecords[tokenId] = VerificationData({
            verifier: msg.sender,
            timestamp: block.timestamp,
            metadataURI: verificationMetadataURI
        });
        
        emit CreditVerified(tokenId, msg.sender, verificationMetadataURI);
    }

    function addVerifier(address account) external onlyOwner {
        verifiers[account] = true;
        emit VerifierAdded(account);
    }

    function removeVerifier(address account) external onlyOwner {
        verifiers[account] = false;
        emit VerifierRemoved(account);
    }

    function getVerificationData(uint256 tokenId) external view returns (VerificationData memory) {
        return verificationRecords[tokenId];
    }

    function isVerifier(address account) external view returns (bool) {
        return verifiers[account];
    }
}
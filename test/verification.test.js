const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Verification", function () {
  let CarbonCredit, Verification, carbonCredit, verification, owner, verifier, user, tokenId;
  const creditAmount = 100;
  const projectType = "Reforestation";
  const validityPeriod = 365 * 24 * 60 * 60;
  const metadataURI = "ipfs://example";
  const verificationMetadataURI = "ipfs://verification-data";

  beforeEach(async function () {
    [owner, verifier, user] = await ethers.getSigners();

    // Deploy CarbonCredit contract
    CarbonCredit = await ethers.getContractFactory("CarbonCredit");
    carbonCredit = await CarbonCredit.deploy();
    await carbonCredit.deployed();

    // Mint a credit for testing BEFORE transferring ownership
    await carbonCredit.mintCredit(
      user.address,
      creditAmount,
      projectType,
      validityPeriod,
      metadataURI
    );
    tokenId = 0;

    // Deploy Verification contract
    Verification = await ethers.getContractFactory("Verification");
    verification = await Verification.deploy(carbonCredit.address);
    await verification.deployed();

    // Transfer ownership of CarbonCredit to Verification contract for verification process
    await carbonCredit.transferOwnership(verification.address);
  });

  describe("Verifier Management", function () {
    it("Should add a verifier", async function () {
      await expect(verification.connect(owner).addVerifier(verifier.address))
        .to.emit(verification, "VerifierAdded")
        .withArgs(verifier.address);

      expect(await verification.isVerifier(verifier.address)).to.be.true;
    });

    it("Should remove a verifier", async function () {
      await verification.connect(owner).addVerifier(verifier.address);
      await expect(verification.connect(owner).removeVerifier(verifier.address))
        .to.emit(verification, "VerifierRemoved")
        .withArgs(verifier.address);

      expect(await verification.isVerifier(verifier.address)).to.be.false;
    });

    it("Should only allow owner to add verifiers", async function () {
      await expect(verification.connect(verifier).addVerifier(user.address))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Credit Verification", function () {
    beforeEach(async function () {
      await verification.connect(owner).addVerifier(verifier.address);
    });

    it("Should verify a credit", async function () {
      await expect(verification.connect(verifier).verifyCredit(tokenId, verificationMetadataURI))
        .to.emit(verification, "CreditVerified")
        .withArgs(tokenId, verifier.address, verificationMetadataURI);

      const verificationData = await verification.getVerificationData(tokenId);
      expect(verificationData.verifier).to.equal(verifier.address);
      expect(verificationData.metadataURI).to.equal(verificationMetadataURI);
      
      const creditDetails = await carbonCredit.getCreditDetails(tokenId);
      expect(creditDetails.verified).to.be.true;
    });

    it("Should fail if non-verifier attempts verification", async function () {
      await expect(verification.connect(user).verifyCredit(tokenId, verificationMetadataURI))
        .to.be.revertedWith("Caller is not a verifier");
    });
  });

  describe("Verification Data", function () {
    beforeEach(async function () {
      await verification.connect(owner).addVerifier(verifier.address);
      await verification.connect(verifier).verifyCredit(tokenId, verificationMetadataURI);
    });

    it("Should return correct verification data", async function () {
      const verificationData = await verification.getVerificationData(tokenId);
      expect(verificationData.verifier).to.equal(verifier.address);
      expect(verificationData.metadataURI).to.equal(verificationMetadataURI);
      expect(verificationData.timestamp).to.be.gt(0);
    });
  });
});
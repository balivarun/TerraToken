const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CarbonCreditMarket", function () {
  let CarbonCredit, CarbonCreditMarket, carbonCredit, carbonMarket, owner, seller, buyer, tokenId;
  const creditAmount = 100;
  const projectType = "Reforestation";
  const validityPeriod = 365 * 24 * 60 * 60;
  const metadataURI = "ipfs://example";
  let listingPrice;

  beforeEach(async function () {
    [owner, seller, buyer] = await ethers.getSigners();

    // Deploy CarbonCredit contract
    CarbonCredit = await ethers.getContractFactory("CarbonCredit");
    carbonCredit = await CarbonCredit.deploy();
    await carbonCredit.deployed();

    // Deploy CarbonCreditMarket contract
    CarbonCreditMarket = await ethers.getContractFactory("CarbonCreditMarket");
    carbonMarket = await CarbonCreditMarket.deploy(carbonCredit.address);
    await carbonMarket.deployed();

    // Mint a credit for testing
    await carbonCredit.connect(owner).mintCredit(
      seller.address,
      creditAmount,
      projectType,
      validityPeriod,
      metadataURI
    );
    tokenId = 0;

    listingPrice = ethers.utils.parseEther("1.0");
  });

  describe("Listing", function () {
    it("Should list a carbon credit", async function () {
      // Approve market contract
      await carbonCredit.connect(seller).approve(carbonMarket.address, tokenId);
      
      await expect(carbonMarket.connect(seller).listCredit(tokenId, listingPrice))
        .to.emit(carbonMarket, "CreditListed")
        .withArgs(tokenId, seller.address, listingPrice);

      const listing = await carbonMarket.listings(tokenId);
      expect(listing.seller).to.equal(seller.address);
      expect(listing.price).to.equal(listingPrice);
      expect(listing.isActive).to.be.true;
    });

    it("Should fail if lister is not token owner", async function () {
      await carbonCredit.connect(seller).approve(carbonMarket.address, tokenId);
      await expect(carbonMarket.connect(buyer).listCredit(tokenId, listingPrice))
        .to.be.revertedWith("Not token owner");
    });

    it("Should fail if market is not approved", async function () {
      await expect(carbonMarket.connect(seller).listCredit(tokenId, listingPrice))
        .to.be.revertedWith("Market not approved");
    });
  });

  describe("Buying", function () {
    beforeEach(async function () {
      await carbonCredit.connect(seller).approve(carbonMarket.address, tokenId);
      await carbonMarket.connect(seller).listCredit(tokenId, listingPrice);
    });

    it("Should allow buying a listed credit", async function () {
      await expect(carbonMarket.connect(buyer).buyCredit(tokenId, { value: listingPrice }))
        .to.emit(carbonMarket, "CreditSold")
        .withArgs(tokenId, seller.address, buyer.address, listingPrice);

      expect(await carbonCredit.ownerOf(tokenId)).to.equal(buyer.address);
    });

    it("Should fail if incorrect price is sent", async function () {
      const wrongPrice = ethers.utils.parseEther("0.5");
      await expect(carbonMarket.connect(buyer).buyCredit(tokenId, { value: wrongPrice }))
        .to.be.revertedWith("Incorrect price");
    });

    it("Should fail if listing is not active", async function () {
      await carbonMarket.connect(seller).cancelListing(tokenId);
      await expect(carbonMarket.connect(buyer).buyCredit(tokenId, { value: listingPrice }))
        .to.be.revertedWith("Listing not active");
    });
  });

  describe("Listing Management", function () {
    beforeEach(async function () {
      await carbonCredit.connect(seller).approve(carbonMarket.address, tokenId);
      await carbonMarket.connect(seller).listCredit(tokenId, listingPrice);
    });

    it("Should allow canceling a listing", async function () {
      await expect(carbonMarket.connect(seller).cancelListing(tokenId))
        .to.emit(carbonMarket, "ListingCanceled")
        .withArgs(tokenId, seller.address);

      const listing = await carbonMarket.listings(tokenId);
      expect(listing.isActive).to.be.false;
    });

    it("Should allow updating the price", async function () {
      const newPrice = ethers.utils.parseEther("2.0");
      await expect(carbonMarket.connect(seller).updatePrice(tokenId, newPrice))
        .to.emit(carbonMarket, "PriceUpdated")
        .withArgs(tokenId, newPrice);

      const listing = await carbonMarket.listings(tokenId);
      expect(listing.price).to.equal(newPrice);
    });
  });
});
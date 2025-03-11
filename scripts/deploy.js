const hre = require("hardhat");

async function main() {
  const CarbonCredit = await hre.ethers.getContractFactory("CarbonCredit");
  const carbonCredit = await CarbonCredit.deploy();
  await carbonCredit.waitForDeployment();
  console.log("CarbonCredit deployed to:", await carbonCredit.getAddress());

  const CarbonCreditMarket = await hre.ethers.getContractFactory("CarbonCreditMarket");
  const carbonCreditMarket = await CarbonCreditMarket.deploy(await carbonCredit.getAddress());
  await carbonCreditMarket.waitForDeployment();
  console.log("CarbonCreditMarket deployed to:", await carbonCreditMarket.getAddress());

  const Verification = await hre.ethers.getContractFactory("Verification");
  const verification = await Verification.deploy(await carbonCredit.getAddress());
  await verification.waitForDeployment();
  console.log("Verification deployed to:", await verification.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
const { ethers } = require("ethers");
require('dotenv').config();

const initializeWeb3 = () => {
  try {
    // Validate environment variables
    const requiredEnvVars = [
      'ALCHEMY_RPC_URL',
      'PRIVATE_KEY',
      'CARBON_CREDIT_ADDRESS',
      'VERIFICATION_ADDRESS'
    ];

    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    if (missingEnvVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    }

    
    const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_RPC_URL);
    
    // Validate provider connection
    provider.getNetwork().then(network => {
      console.log('Connected to network:', network.name);
    }).catch(err => {
      console.error('Error connecting to network:', err);
    });

    
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    
    
    let CarbonCreditMarketABI, VerificationABI;
    try {
      CarbonCreditMarketABI = require('../../../artifacts/contracts/CarbonCreditMarket.sol/CarbonCreditMarket.json').abi;
      VerificationABI = require('../../../artifacts/contracts/verification.sol/Verification.json').abi;
    } catch (error) {
      throw new Error(`Error loading contract ABIs: ${error.message}`);
    }

    
    const carbonCreditContract = new ethers.Contract(
      process.env.CARBON_CREDIT_ADDRESS,
      CarbonCreditMarketABI,
      wallet
    );

    const verificationContract = new ethers.Contract(
      process.env.VERIFICATION_ADDRESS,
      VerificationABI,
      wallet
    );

    
    const validateContracts = async () => {
      try {
    
        const carbonCreditTokenAddress = await carbonCreditContract.carbonCreditToken();
        console.log('Carbon Credit Token Address:', carbonCreditTokenAddress);

    
        const isOwnerVerifier = await verificationContract.isVerifier(wallet.address);
        console.log('Is wallet address a verifier:', isOwnerVerifier);

        console.log('Contracts validated successfully');
      } catch (error) {
        console.error('Error validating contracts:', error);
        throw new Error(`Contract validation failed: ${error.message}`);
      }
    };

    validateContracts().catch(console.error);

    return {
      provider,
      wallet,
      carbonCreditContract,
      verificationContract
    };
  } catch (error) {
    console.error('Error initializing Web3:', error);
    throw error;
  }
};


const verifyContractAddresses = async () => {
  try {
    const { provider } = initializeWeb3();
    
    const carbonCodeExists = await provider.getCode(process.env.CARBON_CREDIT_ADDRESS);
    const verificationCodeExists = await provider.getCode(process.env.VERIFICATION_ADDRESS);

    console.log('\nContract Deployment Status:');
    console.log('---------------------------');
    console.log('Carbon Credit Market Contract:', carbonCodeExists !== '0x' ? 'Deployed' : 'Not Deployed');
    console.log('Verification Contract:', verificationCodeExists !== '0x' ? 'Deployed' : 'Not Deployed');

    if (carbonCodeExists !== '0x' && verificationCodeExists !== '0x') {
      console.log('\nAttempting to validate contract functions...');
      const web3 = initializeWeb3();
      
    
      const carbonCreditToken = await web3.carbonCreditContract.carbonCreditToken();
      const ownerIsVerifier = await web3.verificationContract.isVerifier(web3.wallet.address);
      
      console.log('\nContract Function Test Results:');
      console.log('-------------------------------');
      console.log('Carbon Credit Token Address:', carbonCreditToken);
      console.log('Owner is Verifier:', ownerIsVerifier);
    }

    return {
      carbonCreditDeployed: carbonCodeExists !== '0x',
      verificationDeployed: verificationCodeExists !== '0x'
    };
  } catch (error) {
    console.error('Error verifying contract addresses:', error);
    throw error;
  }
};

module.exports = {
  initializeWeb3,
  verifyContractAddresses
};
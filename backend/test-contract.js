
require('dotenv').config();
const { verifyContractAddresses } = require('./src/utils/web3');

async function testContracts() {
  console.log('Starting contract verification...');
  console.log('Environment:', {
    CARBON_CREDIT_ADDRESS: process.env.CARBON_CREDIT_ADDRESS,
    VERIFICATION_ADDRESS: process.env.VERIFICATION_ADDRESS,    
});

  try {
    console.log('\nTesting contract deployments...');
    await verifyContractAddresses();
  } catch (error) {
    console.error('\nTest failed:', error.message);
    console.error('\nFull error:', error);
  }
}

console.log('Contract verification script initialized');
testContracts();
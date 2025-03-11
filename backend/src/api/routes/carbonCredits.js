// src/api/routes/carbonCredits.js
const express = require('express');
const { carbonCreditContract } = require('../../utils/web3');

const router = express.Router();

router.get('/:tokenId', async (req, res) => {
  try {
    const tokenId = req.params.tokenId;
    const creditDetails = await carbonCreditContract.getCreditDetails(tokenId);
    res.json(creditDetails);
  } catch (error) {
    console.error('Error fetching credit details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/mint', async (req, res) => {
  try {
    const { recipient, amount, projectType, validityPeriod, metadataURI } = req.body;
    const tx = await carbonCreditContract.mintCredit(recipient, amount, projectType, validityPeriod, metadataURI);
    await tx.wait();
    res.json({ success: true, transactionHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


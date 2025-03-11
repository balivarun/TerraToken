// src/api/routes/verification.js
const express = require('express');
const { verificationContract } = require('../../utils/web3');
const verificationService = require('../../services/verificationService');

const router = express.Router();

router.post('/verify/:tokenId', async (req, res) => {
  try {
    const tokenId = req.params.tokenId;
    const projectData = req.body;

    const verificationResult = await verificationService.verifyCredit(tokenId, projectData);

    if (verificationResult.success) {
      const tx = await verificationContract.verifyCredit(
        tokenId,
        verificationResult.verificationData.metadataURI
      );
      await tx.wait();

      res.json({
        success: true,
        message: 'Credit verified successfully',
        transactionHash: tx.hash,
        verificationData: verificationResult.verificationData
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Credit verification failed',
        reason: verificationResult.reason
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
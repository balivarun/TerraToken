const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'artifacts', 'contracts');
const destDir = path.join(__dirname, '..', 'frontend', 'src', 'abis');

const contracts = ['CarbonCredit', 'CarbonCreditMarket', 'Verification'];

contracts.forEach(contract => {
    const sourceFile = path.join(sourceDir, `${contract}.sol`, `${contract}.json`);
    const destFile = path.join(destDir, `${contract}.json`);

    try {
        if (fs.existsSync(sourceFile)) {
            const artifact = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
            fs.writeFileSync(destFile, JSON.stringify(artifact.abi, null, 2));
            console.log(`Copied ABI for ${contract}`);
        } else {
            console.error(`Source file not found: ${sourceFile}`);
        }
    } catch (error) {
        console.error(`Error processing ${contract}:`, error.message);
    }
});

console.log('ABI copy process completed.');
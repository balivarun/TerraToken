
```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```



## What Is This Project?
A platform that allows people to buy and sell carbon credits (certificates representing reduced carbon emissions) using both traditional web technology and blockchain to ensure transactions are transparent and trustworthy.

## Why It Matters
Companies need carbon credits to offset emissions, but current markets lack transparency. Our platform solves this by recording all transactions on a blockchain where they cannot be altered.

## System Overview

- **User-friendly web interface** built with React
- **Backend services** using Express.js and Node.js
- **Database** using MongoDB for user data and project information
- **Blockchain component** using Polygon for transparent record-keeping
- **Document storage** using IPFS (a decentralized storage system)

## Key Features

### For Users
- **Simple Authentication**: Connect with MetaMask wallet or traditional username/password
- **Marketplace**: Browse carbon credits with clear project information
- **Dashboard**: Track your carbon credit portfolio and impact
- **Certificate Generation**: Get proof when you "retire" (use) a carbon credit

### For Project Owners
- **Project Submission**: Register carbon reduction projects
- **Documentation Management**: Upload verification documents
- **Credit Issuance**: Receive tradable carbon credit tokens


## How It Works

### Creating Carbon Credits
1. A project owner (maybe a solar farm) registers their project
2. They upload evidence of carbon reduction to IPFS
3. Once verified, carbon credits are created as blockchain tokens

### Buying Carbon Credits
1. Buyers browse available credits in the marketplace
2. When a purchase is made, the transaction is recorded on the blockchain
3. Ownership transfers automatically and securely

### Using (Retiring) Credits
1. When a company wants to claim their offset, they "retire" the credit
2. This process generates a certificate and permanently removes the credit from circulation

## Technical Components

### Frontend (What Users See)
- React application with Material UI components
- Web3.js for blockchain wallet integration
- Interactive dashboards showing carbon impact

### Backend (Server-Side Logic)
- Express.js REST API
- Authentication system with JWT tokens
- Integration services connecting to blockchain

### Data Storage
- MongoDB for user accounts, listings, and project details
- IPFS for immutable document storage

### Blockchain Layer
- **Carbon Credit Tokens**: Digital representation of carbon credits
- **Marketplace Contract**: Handles buying and selling
- **Project Registry**: Records verified carbon projects

## Project Implementation Plan

1. **Phase 1**: Create basic user authentication and marketplace UI
2. **Phase 2**: Implement blockchain integration for transactions
3. **Phase 3**: Add project submission and verification workflow
4. **Phase 4**: Develop analytics and reporting features

## Learning Outcomes

This project teaches:
- Full-stack web development with MERN stack
- Blockchain integration for real-world applications
- Environmental market mechanisms
- Building systems that require trust and transparency





















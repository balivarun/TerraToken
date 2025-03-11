// require("@nomicfoundation/hardhat-toolbox");
// require("dotenv").config();

// module.exports = {
//   defaultNetwork: "sepolia",
//   networks: {
//     hardhat: {
//       chainId: 1337,
//       gasPrice: 1,
//       initialBaseFeePerGas: 0
//     },
//     sepolia: {
//       url: `https://eth-sepolia.g.alchemy.com/v2/T0qIBsLD5-rVNXm-gJ-dEF1J8ayyVQMM`,
//       accounts: [process.env.PRIVATE_KEY],
//       gasPrice: "auto",
//       gasMultiplier: 1.2
//     }
//   },
//   solidity: {
//     version: "0.8.20",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 1000,
//         details: {
//           yul: true,
//           yulDetails: {
//             stackAllocation: true,
//             optimizerSteps: "dhfoDgvulfnTUtnIf"
//           }
//         }
//       },
//       viaIR: false
//     }
//   },
//   paths: {
//     sources: "./contracts",
//     tests: "./test",
//     cache: "./cache",
//     artifacts: "./artifacts"
//   },
//   mocha: {
//     timeout: 40000
//   },
//   gasReporter: {
//     enabled: true,
//     currency: "USD",
//     gasPrice: 21
//   }
// };





require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
  },
};
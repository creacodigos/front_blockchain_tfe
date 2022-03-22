require('dotenv').config();

require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
require('solidity-coverage');

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config = {
    paths: {
        sources: "./contracts",
        tests: "./testHardhat",
        cache: "./cache",
        artifacts: "./artifacts"
    },
    solidity: {
        compilers: [
            {
                version: "0.8.4",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200
                    }
                },
            },
        ]
    },
    networks: {
        coverage: {
            url: "http://localhost:8545"
        },
        rinkeby: {
            url: "https://rinkeby.infura.io/v3/8eef6fb7293d419b81695924050a08e4",
            accounts: [PRIVATE_KEY]
        },
    }
};

module.exports = config;
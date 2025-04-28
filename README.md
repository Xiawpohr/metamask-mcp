# MetaMask MCP

A Model Context Protocol (MCP) server that allows LLM to interact with the blockchain through MetaMask.

With these tools, your private keys remain securely stored in your crypto wallet and are never shared with the AI agent when signing messages or sending transactions.

<a href="https://glama.ai/mcp/servers/@Xiawpohr/metamask-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@Xiawpohr/metamask-mcp/badge" alt="MetaMask MCP server" />
</a>

## Preview

https://github.com/user-attachments/assets/3fe8f20b-4666-4c36-8030-04d3e5d587c7

## Requirements
- Node.js (v20 or higher)
- pnpm

## Setup

1. Clone the repository
```
git clone https://github.com/Xiawpohr/metamask-mcp.git
cd metamask-mcp
```

2. Install dependencies
```
pnpm install
```

3. Build the project
```
pnpm build
```

## Using with Claude Desktop

Follow the guide https://modelcontextprotocol.io/quickstart/user and add the following configuration:

```
{
  "mcpServers": {
    "metamask": {
      "command": "node",
      "args": [
        "/PATH/TO/YOUR_PROJECT/dist/index.ts"
      ]
    }
  }
}
```

## Tools

- `call`: Executing a new message call immediately without submitting a transaction to the network.
- `get-chain-list`: Get a list of all chains information.
- `get-connect-uri`: Get the connect URI to connect to a MetaMask wallet.
- `show-connect-qrcode`: Show the connect QR code for a given connect URI.
- `deploy-contract`: Deploy a contract to the network, given bytecode, and constructor arguments.
- `disconnect`: Disconnect the wallet.
- `estimate-fee-per-gas`: Estimate for the fees per gas (in wei) for a transaction to be likely included in the next block.
- `estimate-gas`: Estimate the gas necessary to complete a transaction without submitting it to the network.
- `get-account`: Get the current account.
- `get-native-currency-balance`: Get the native currency balance of an address.
- `get-token-balance`: Get token balance of an address.
- `get-block-number`: Fetch the number of the most recent block seen.
- `get-block`: Fetch information about a block at a block number, hash or tag.
- `get-chain-id`: Get the current chain id.
- `get-chains`: Get the configured chains.
- `get-ens-address`: Fetch the ENS address for name.
- `get-ens-name`: Fetch the primary ENS name for address.
- `get-gas-price`: Fetch the current price of gas (in wei).
- `get-token`: Fetch the token information.
- `get-transaction-reeceipt`: Fetch the Transaction Receipt given a Transaction hash.
- `get-transaction`: Fetch transaction given hash or block identifiers.
- `read-contract`: Call a read-only function on a contract, and returning the response.
- `send-transaction`: Send transactions to networks.
- `sign-message`: Sign a message.
- `switch-chain`: Switch the target chain.
- `verify-message`: Verify that a message was signed by the provided address.
- `wait-for-transaction-receipt`: Waits for the transaction to be included on a block, and then returns the transaction receipt.
- `write-contract`: Execute a write function on a contract.

## Prompts
- [`be-metamask-assistant`](./src/prompts/be-metamask-assistant.ts)

## Contributing

Contributions are welcome! Please submit pull requests with any improvements or bug fixes.

## License

MIT License
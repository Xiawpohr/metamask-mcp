import type { Config } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import { simulateContract, writeContract } from "@wagmi/core";
import { Abi, Address } from "abitype/zod";
import { TransactionExecutionError } from "viem";
import { z } from "zod";
import { JSONStringify } from "../utils/json-stringify";

export function registerWriteContractTools(server: FastMCP, wagmiConfig: Config): void {
  server.addTool({
    name: "write-contract",
    description: "Execute a write function on a contract.",
    parameters: z.object({
      abi: Abi.describe("The contract's ABI."),
      address: Address.describe("The contract's address."),
      functionName: z.string().describe("Function to call on the contract."),
      args: z.unknown().array().optional().describe("Arguments to pass when calling the contract."),
      value: z.coerce.bigint().optional().describe("Value in wei sent with this transaction."),
      maxFeePerGas: z.coerce.bigint().optional().describe("Total fee per gas in wei, inclusive of maxPriorityFeePerGas."),
      maxPriorityFeePerGas: z.coerce.bigint().optional().describe("Max priority fee per gas in wei."),
      chainId: z.coerce.number().optional().describe("Chain ID to validate against before sending transaction."),
    }),
    execute: async (args) => {
      try {
        const { request } = await simulateContract(wagmiConfig, args);
        const result = await writeContract(wagmiConfig, request);
        return {
          content: [
            {
              type: "text",
              text: JSONStringify({
                hash: result,
              }),
            },
          ],
        };
      }
      catch (error) {
        if (error instanceof TransactionExecutionError) {
          return {
            content: [
              {
                type: "text",
                text: error.cause.message,
              },
            ],
          };
        }
        return {
          content: [
            {
              type: "text",
              text: (error as Error).message,
            },
          ],
        };
      }
    },
  });
};

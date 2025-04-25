import type { Config } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import { readContract } from "@wagmi/core";
import { Abi, Address } from "abitype/zod";
import { TransactionExecutionError } from "viem";
import { z } from "zod";

export function registerReadContractTools(server: FastMCP, wagmiConfig: Config): void {
  server.addTool({
    name: "read-contract",
    description: "Call a read-only function on a contract, and returning the response.",
    parameters: z.object({
      abi: Abi.describe("The contract's ABI."),
      address: Address.describe("The contract's address."),
      functionName: z.string().describe("Function to call on the contract."),
      args: z.unknown().array().optional().describe("Arguments to pass when calling the contract."),
      chainId: z.coerce.number().optional().describe("ID of chain to use when fetching data."),
    }),
    execute: async (args) => {
      try {
        const result = await readContract(wagmiConfig, args);
        return {
          content: [
            {
              type: "text",
              text: `${result}`,
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

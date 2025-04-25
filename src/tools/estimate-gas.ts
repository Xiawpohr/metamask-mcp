import type { Config } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import { estimateGas } from "@wagmi/core";
import { Address } from "abitype/zod";
import { TransactionExecutionError } from "viem";
import { z } from "zod";
import { JSONStringify } from "../utils/json-stringify";

export function registerEstimateGasTools(server: FastMCP, wagmiConfig: Config): void {
  server.addTool({
    name: "estimate-gas",
    description: "Estimate the gas necessary to complete a transaction without submitting it to the network.",
    parameters: z.object({
      to: Address.describe("The transaction recipient or contract address."),
      data: Address.optional().describe("A contract hashed method call with encoded args."),
      value: z.coerce.bigint().optional().describe("Value in wei sent with this transaction."),
      maxFeePerGas: z.coerce.bigint().optional().describe("Total fee per gas in wei, inclusive of maxPriorityFeePerGas."),
      maxPriorityFeePerGas: z.coerce.bigint().optional().describe("Max priority fee per gas in wei."),
      chainId: z.coerce.number().optional().describe("Chain ID to validate against before sending transaction."),
    }),
    execute: async (args) => {
      try {
        const result = await estimateGas(wagmiConfig, args);
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

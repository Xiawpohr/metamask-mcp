import type { Config } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import { waitForTransactionReceipt } from "@wagmi/core";
import { z } from "zod";
import { TransactionHash } from "../utils/evm-schema";
import { JSONStringify } from "../utils/json-stringify";

export function registerWaitForTransactionReceiptTools(server: FastMCP, wagmiConfig: Config): void {
  server.addTool({
    name: "wait-for-transaction-receipt",
    description: "Waits for the transaction to be included on a block, and then returns the transaction receipt.",
    parameters: z.object({
      hash: TransactionHash.describe("The transaction hash to wait for."),
      confirmations: z.coerce.number().optional().default(0).describe("The number of confirmations (blocks that have passed) to wait before resolving."),
      chainId: z.coerce.number().optional().describe("ID of chain to use when fetching data."),
    }),
    execute: async (args) => {
      try {
        const result = await waitForTransactionReceipt(wagmiConfig, args);
        return {
          content: [
            {
              type: "text",
              text: JSONStringify(result),
            },
          ],
        };
      }
      catch (error) {
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

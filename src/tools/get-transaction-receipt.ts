import type { Config } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import { getTransactionReceipt } from "@wagmi/core";
import { z } from "zod";
import { TransactionHash } from "../utils/evm-schema";
import { JSONStringify } from "../utils/json-stringify";

export function registerGetTransactionReceiptTools(server: FastMCP, wagmiConfig: Config): void {
  server.addTool({
    name: "get-transaction-receipt",
    description: "Fetch the Transaction Receipt given a Transaction hash.",
    parameters: z.object({
      hash: TransactionHash.describe("A transaction hash."),
      chainId: z.coerce.number().optional().describe("The ID of chain to return the transaction receipt from."),
    }),
    execute: async (args) => {
      const result = await getTransactionReceipt(wagmiConfig, args);
      return {
        content: [
          {
            type: "text",
            text: JSONStringify(result),
          },
        ],
      };
    },
  });
};

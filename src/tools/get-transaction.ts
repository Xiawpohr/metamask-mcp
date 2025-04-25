import type { Config } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import { getTransaction } from "@wagmi/core";
import { z } from "zod";
import { TransactionHash } from "../utils/evm-schema";
import { JSONStringify } from "../utils/json-stringify";

export function registerGetTransactionTools(server: FastMCP, wagmiConfig: Config): void {
  server.addTool({
    name: "get-transaction",
    description: "Fetch transaction given hash or block identifiers.",
    parameters: z.object({
      hash: TransactionHash.describe("Hash to get transaction."),
      chainId: z.coerce.number().optional().describe("ID of chain to use when fetching data."),
    }),
    execute: async (args) => {
      const result = await getTransaction(wagmiConfig, args);
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

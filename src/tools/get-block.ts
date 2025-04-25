import type { Config, GetBlockParameters } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import { getBlock } from "@wagmi/core";
import { Address } from "abitype/zod";
import { z } from "zod";
import { JSONStringify } from "../utils/json-stringify";

export function registerGetBlockTools(server: FastMCP, wagmiConfig: Config): void {
  server.addTool({
    name: "get-block",
    description: "Fetch information about a block at a block number, hash or tag.",
    parameters: z.object({
      chainId: z.coerce.number().optional().describe("ID of chain to use when fetching data."),
      blockHash: Address.optional().describe("Information at a given block hash."),
      blockNumber: z.coerce.bigint().optional().describe("Information at a given block number."),
      blockTag: z.enum(["latest", "earliest", "pending", "safe", "finalized"]).optional().default("latest").describe("Information at a given block tag. Defaults to 'latest'."),
    }),
    execute: async (args) => {
      const chainId = args.chainId as typeof wagmiConfig["chains"][number]["id"];
      const blockHash = args.blockHash;
      const blockNumber = args.blockNumber;
      const blockTag = args.blockTag;

      const parameters: GetBlockParameters = {
        chainId,
        includeTransactions: false,
      };
      if (blockHash) {
        parameters.blockHash = blockHash;
      }
      else if (blockNumber) {
        parameters.blockNumber = blockNumber;
      }
      else if (blockTag) {
        parameters.blockTag = blockTag;
      }
      const result = await getBlock(wagmiConfig, parameters);
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

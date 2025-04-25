import type { Config } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import { getEnsName } from "@wagmi/core";
import { Address } from "abitype/zod";
import { z } from "zod";

export function registerGetENSNameTools(server: FastMCP, wagmiConfig: Config): void {
  server.addTool({
    name: "get-ens-name",
    description: "Fetch the primary ENS name for address.",
    parameters: z.object({
      address: Address.describe("Address to get the name for."),
      chainId: z.coerce.number().optional().describe("ID of chain to use when fetching data."),
      blockNumber: z.coerce.bigint().optional().describe("Block number to get name at."),
    }),
    execute: async (args) => {
      const result = await getEnsName(wagmiConfig, args);
      return {
        content: [
          {
            type: "text",
            text: result ?? "undefined",
          },
        ],
      };
    },
  });
};

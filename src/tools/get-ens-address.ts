import type { Config } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import { getEnsAddress } from "@wagmi/core";
import { normalize } from "viem/ens";
import { z } from "zod";

export function registerGetENSAddressTools(server: FastMCP, wagmiConfig: Config): void {
  server.addTool({
    name: "get-ens-address",
    description: "Fetch the ENS address for name.",
    parameters: z.object({
      name: z.string().transform(normalize).describe("Name to get the address for."),
      chainId: z.coerce.number().optional().describe("ID of chain to use when fetching data."),
      blockNumber: z.coerce.bigint().optional().describe("Block number to get ENS address at."),
    }),
    execute: async (args) => {
      const result = await getEnsAddress(wagmiConfig, args);
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

import type { Config } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import { getBlockNumber } from "@wagmi/core";
import { z } from "zod";

export function registerGetBlockNumberTools(server: FastMCP, wagmiConfig: Config): void {
  server.addTool({
    name: "get-block-number",
    description: "Fetch the number of the most recent block seen.",
    parameters: z.object({
      chainId: z.coerce.number().optional().describe("ID of chain to use when fetching data."),
    }),
    execute: async (args) => {
      const chainId = args.chainId as typeof wagmiConfig["chains"][number]["id"];
      const result = await getBlockNumber(wagmiConfig, {
        chainId,
      });
      return {
        content: [
          {
            type: "text",
            text: result.toString(),
          },
        ],
      };
    },
  });
};

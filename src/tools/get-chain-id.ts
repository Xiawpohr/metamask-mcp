import type { Config } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import { getChainId } from "@wagmi/core";
import { z } from "zod";

export function registerGetChainIdTools(server: FastMCP, wagmiConfig: Config): void {
  server.addTool({
    name: "get-chain-id",
    description: "Get the current chain id.",
    parameters: z.object({}),
    execute: async () => {
      const result = getChainId(wagmiConfig);
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

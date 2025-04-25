import type { FastMCP } from "fastmcp";
import { z } from "zod";

export function registerChainlistTools(server: FastMCP): void {
  server.addTool({
    name: "get-chain-list",
    description: "Get a list of all chains information.",
    parameters: z.object({}),
    execute: async () => {
      const url = "https://chainlist.org/rpcs.json";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data),
          },
        ],
      };
    },
  });
};

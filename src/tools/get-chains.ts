import type { Config } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import { getChains } from "@wagmi/core";
import { z } from "zod";
import { JSONStringify } from "../utils/json-stringify";

export function registerGetChainsTools(server: FastMCP, wagmiConfig: Config): void {
  server.addTool({
    name: "get-chains",
    description: "Get the configured chains.",
    parameters: z.object({}),
    execute: async () => {
      const result = getChains(wagmiConfig);
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

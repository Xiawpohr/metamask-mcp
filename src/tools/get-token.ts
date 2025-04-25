import type { Config } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import { getToken } from "@wagmi/core";
import { Address } from "abitype/zod";
import { z } from "zod";
import { JSONStringify } from "../utils/json-stringify";

export function registerGetTokenTools(server: FastMCP, wagmiConfig: Config): void {
  server.addTool({
    name: "get-token",
    description: "Fetch the token information.",
    parameters: z.object({
      address: Address.describe("Address to get token for."),
      chainId: z.coerce.number().optional().describe("ID of chain to use when fetching data."),
    }),
    execute: async (args) => {
      const result = await getToken(wagmiConfig, args);
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

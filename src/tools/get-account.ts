import type { Config } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import { getAccount } from "@wagmi/core";
import { z } from "zod";
import { JSONStringify } from "../utils/json-stringify";

export function registerGetAccountTools(server: FastMCP, wagmiConfig: Config): void {
  server.addTool({
    name: "get-account",
    description: "Get the current account.",
    parameters: z.object({}),
    execute: async () => {
      const result = getAccount(wagmiConfig);
      return {
        content: [
          {
            type: "text",
            text: JSONStringify({
              address: result.address,
              addresses: result.addresses,
              chainId: result.chainId,
              status: result.status,
            }),
          },
        ],
      };
    },
  });
};

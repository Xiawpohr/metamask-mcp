import type { Config } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import { getBalance } from "@wagmi/core";
import { Address } from "abitype/zod";
import { z } from "zod";
import { JSONStringify } from "../utils/json-stringify";

export function registerGetBalanceTools(server: FastMCP, wagmiConfig: Config): void {
  server.addTool({
    name: "get-native-currency-balance",
    description: "Get the native currency balance of an address.",
    parameters: z.object({
      address: Address.describe("Address to get balance for."),
    }),
    execute: async (args) => {
      const result = await getBalance(wagmiConfig, args);
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

  server.addTool({
    name: "get-token-balance",
    description: "Get token balance of an address.",
    parameters: z.object({
      address: Address.describe("Address to get balance for."),
      token: Address.describe("ERC-20 token address to get balance for."),
    }),
    execute: async (args) => {
      const result = await getBalance(wagmiConfig, args);
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

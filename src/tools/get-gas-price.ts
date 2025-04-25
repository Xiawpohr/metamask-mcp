import type { Config } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import { getGasPrice } from "@wagmi/core";
import { z } from "zod";

export function registerGetGasPriceTools(server: FastMCP, wagmiConfig: Config): void {
  server.addTool({
    name: "get-gas-price",
    description: "Fetch the current price of gas (in wei).",
    parameters: z.object({
      chainId: z.coerce.number().optional().describe("ID of chain to use when fetching data."),
    }),
    execute: async (args) => {
      const result = await getGasPrice(wagmiConfig, args);
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

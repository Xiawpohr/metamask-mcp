import type { Config } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import { estimateFeesPerGas } from "@wagmi/core";
import { z } from "zod";
import { JSONStringify } from "../utils/json-stringify";

export function registerEstimateFeePerGasTools(server: FastMCP, wagmiConfig: Config): void {
  server.addTool({
    name: "estimate-fee-per-gas",
    description: "Estimate for the fees per gas (in wei) for a transaction to be likely included in the next block.",
    parameters: z.object({
      chainId: z.coerce.number().optional().describe("ID of chain to use when fetching data."),
      formatUnits: z.enum(["ether", "gwei", "wei"]).default("gwei").optional().describe("Units to use when formatting result."),
    }),
    execute: async (args) => {
      const result = await estimateFeesPerGas(wagmiConfig, args);
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

import type { Config } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import { call } from "@wagmi/core";
import { Address } from "abitype/zod";
import { TransactionExecutionError } from "viem";
import { z } from "zod";
import { Calldata } from "../utils/evm-schema";
import { JSONStringify } from "../utils/json-stringify";

export function registerCallTools(server: FastMCP, wagmiConfig: Config): void {
  server.addTool({
    name: "call",
    description: "Executing a new message call immediately without submitting a transaction to the network.",
    parameters: z.object({
      to: Address.describe("The contract address or recipient."),
      data: Calldata.describe("A contract hashed method call with encoded args."),
      value: z.coerce.bigint().optional().describe("Value (in wei) sent with this transaction."),
    }),
    execute: async (args) => {
      try {
        const result = await call(wagmiConfig, args);
        return {
          content: [
            {
              type: "text",
              text: JSONStringify({
                hash: result,
              }),
            },
          ],
        };
      }
      catch (error) {
        if (error instanceof TransactionExecutionError) {
          return {
            content: [
              {
                type: "text",
                text: error.cause.message,
              },
            ],
          };
        }
        return {
          content: [
            {
              type: "text",
              text: (error as Error).message,
            },
          ],
        };
      }
    },
  });
};

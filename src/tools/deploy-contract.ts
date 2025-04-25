import type { Config } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import { deployContract } from "@wagmi/core";
import { Abi } from "abitype/zod";
import { TransactionExecutionError } from "viem";
import { z } from "zod";
import { Calldata } from "../utils/evm-schema";
import { JSONStringify } from "../utils/json-stringify";

export function registerDeployContractTools(server: FastMCP, wagmiConfig: Config): void {
  server.addTool({
    name: "deploy-contract",
    description: "Deploy a contract to the network, given bytecode, and constructor arguments.",
    parameters: z.object({
      abi: Abi.describe("The contract's ABI."),
      args: z.unknown().array().optional().describe("Arguments to pass when deploying the contract. Inferred from abi."),
      bytecode: Calldata.describe("The contract's bytecode."),
    }),
    execute: async (args) => {
      try {
        const result = await deployContract(wagmiConfig, args);
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

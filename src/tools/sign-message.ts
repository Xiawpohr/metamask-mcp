import type { Config } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import { signMessage } from "@wagmi/core";
import { z } from "zod";
import { JSONStringify } from "../utils/json-stringify";

export function registerSignMessageTools(server: FastMCP, wagmiConfig: Config): void {
  server.addTool({
    name: "sign-message",
    description: "Sign a message.",
    parameters: z.object({
      message: z.string().describe("Message to sign."),
    }),
    execute: async (args, { log }) => {
      try {
        const message = args.message;
        const result = await signMessage(wagmiConfig, {
          message,
        });
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
        log.debug((error as Error).message);
        throw error;
      }
    },
  });
};

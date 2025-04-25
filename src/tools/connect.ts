import type { Config } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import { connect } from "@wagmi/core";
import { imageContent } from "fastmcp";
import QRCode from "qrcode";
import { z } from "zod";
import { metaMask } from "../connectors/metamask";
import { JSONStringify } from "../utils/json-stringify";

export function registerConnectTools(server: FastMCP, wagmiConfig: Config): void {
  server.addTool({
    name: "get-connect-uri",
    description: "Get the connect URI to connect to a MetaMask wallet.",
    parameters: z.object({}),
    execute: async (_, { log }) => {
      const uri = await getMetaMaskConnectURI(log, wagmiConfig);
      return {
        content: [
          {
            type: "text",
            text: JSONStringify({
              uri,
            }),
          },
        ],
      };
    },
  });

  server.addTool({
    name: "show-connect-qrcode",
    description: "Show the connect QR code for a given connect URI.",
    parameters: z.object({
      uri: z.string().describe("Connect URI"),
    }),
    execute: async (args) => {
      const uri = args.uri;
      const qrCode = await QRCode.toDataURL(uri, {
        width: 200,
      });
      return imageContent({
        url: qrCode,
      });
    },
  });
};

async function getMetaMaskConnectURI(log: any, wagmiConfig: Config) {
  return new Promise((resolve, reject) => {
    const connectorFn = metaMask({
      headless: true,
    });
    const connector = wagmiConfig._internal.connectors.setup(connectorFn);
    connector.emitter.on("message", (payload) => {
      if (payload.type === "display_uri") {
        const uri = payload.data;
        resolve(uri);
      }
    });
    connector.emitter.on("connect", (payload) => {
      log.debug("connect success!", payload.accounts);
    });
    connector.emitter.on("error", (payload) => {
      log.error(payload.error);
    });

    connect(wagmiConfig, { connector })
      .catch((error) => {
        log.error("connect error: ", error);
        log.error(error.stack);
        reject(error);
      });
  });
}

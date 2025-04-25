import type { FastMCP } from "fastmcp";
import { registerBeMetaMaskAssistantPrompt } from "./index";

export function registerPrompts(server: FastMCP) {
  registerBeMetaMaskAssistantPrompt(server);
}

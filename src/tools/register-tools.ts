import type { Config } from "@wagmi/core";
import type { FastMCP } from "fastmcp";
import {
  registerCallTools,
  registerChainlistTools,
  registerConnectTools,
  registerDeployContractTools,
  registerDisconnectTools,
  registerEstimateFeePerGasTools,
  registerEstimateGasTools,
  registerGetAccountTools,
  registerGetBalanceTools,
  registerGetBlockNumberTools,
  registerGetBlockTools,
  registerGetChainIdTools,
  registerGetChainsTools,
  registerGetENSAddressTools,
  registerGetENSNameTools,
  registerGetTokenTools,
  registerGetTransactionReceiptTools,
  registerGetTransactionTools,
  registerReadContractTools,
  registerSendTransactionTools,
  registerSignMessageTools,
  registerSwitchChainTools,
  registerVerifyMessageTools,
  registerWaitForTransactionReceiptTools,
  registerWaitSecondsTools,
  registerWriteContractTools,
} from "./index";

export function registerTools(server: FastMCP, wagmiConfig: Config) {
  registerCallTools(server, wagmiConfig);
  registerChainlistTools(server);
  registerConnectTools(server, wagmiConfig);
  registerDeployContractTools(server, wagmiConfig);
  registerDisconnectTools(server, wagmiConfig);
  registerEstimateFeePerGasTools(server, wagmiConfig);
  registerEstimateGasTools(server, wagmiConfig);
  registerGetAccountTools(server, wagmiConfig);
  registerGetBalanceTools(server, wagmiConfig);
  registerGetBlockNumberTools(server, wagmiConfig);
  registerGetBlockTools(server, wagmiConfig);
  registerGetChainIdTools(server, wagmiConfig);
  registerGetChainsTools(server, wagmiConfig);
  registerGetENSAddressTools(server, wagmiConfig);
  registerGetENSNameTools(server, wagmiConfig);
  registerGetTokenTools(server, wagmiConfig);
  registerGetTransactionReceiptTools(server, wagmiConfig);
  registerGetTransactionTools(server, wagmiConfig);
  registerReadContractTools(server, wagmiConfig);
  registerSendTransactionTools(server, wagmiConfig);
  registerSignMessageTools(server, wagmiConfig);
  registerSwitchChainTools(server, wagmiConfig);
  registerVerifyMessageTools(server, wagmiConfig);
  registerWaitForTransactionReceiptTools(server, wagmiConfig);
  registerWaitSecondsTools(server);
  registerWriteContractTools(server, wagmiConfig);
}

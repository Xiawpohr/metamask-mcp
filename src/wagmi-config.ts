import { kvsMemoryStorage } from "@kvs/memorystorage";
import { createConfig, createStorage, http } from "@wagmi/core";
import { mainnet, sepolia } from "@wagmi/core/chains";
import { createClient } from "viem";

export async function createWagmiConfig() {
  const kvsStorage = await kvsMemoryStorage({
    name: "wagmi-storage",
    version: 1,
  });

  const storage = {
    getItem: async (key: string) => {
      const value = await kvsStorage.get(key);
      return value?.toString();
    },
    setItem: async (key: string, value: string) => {
      kvsStorage.set(key, value);
    },
    removeItem: async (key: string) => {
      kvsStorage.delete(key);
    },
  };

  return createConfig({
    chains: [mainnet, sepolia],
    ssr: true,
    storage: createStorage({ storage }),
    client({ chain }) {
      return createClient({
        chain,
        transport: http(),
      });
    },
  });
}

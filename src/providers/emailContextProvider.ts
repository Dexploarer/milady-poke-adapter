import type { Provider } from "@elizaos/core";
import { createPokeClient } from "../client/pokeClient.js";
import type { PokeTransport } from "../types.js";

export function createEmailContextProvider(transport: PokeTransport): Provider {
  return {
    name: "poke_email_context",
    description: "Recent email context from Poke",
    get: async (runtime) => {
      const client = createPokeClient(runtime, transport);
      const recentEmails = await client.searchEmails("in:inbox newer_than:7d", 5);

      return {
        data: {
          recentEmails
        }
      };
    }
  };
}

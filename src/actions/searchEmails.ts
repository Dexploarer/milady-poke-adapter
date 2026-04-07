import type { Action } from "@elizaos/core";
import { createPokeClient } from "../client/pokeClient.js";
import type { PokeTransport } from "../types.js";

export function createSearchEmailsAction(transport: PokeTransport): Action {
  return {
    name: "poke_search_emails",
    similes: ["find email", "search inbox", "look up email"],
    description: "Search the user's email using Poke.",
    validate: async () => true,
    handler: async (runtime, message) => {
      const client = createPokeClient(runtime, transport);
      const content = ((message as any)?.content ?? {}) as {
        query?: string;
        text?: string;
        limit?: number;
      };

      const query = content.query ?? content.text ?? "";
      const limit = content.limit ?? 10;

      return await client.searchEmails(query, limit);
    }
  };
}

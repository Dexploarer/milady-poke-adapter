import type { Action } from "@elizaos/core";
import { createPokeClient } from "../client/pokeClient.js";
import type { PokeTransport } from "../types.js";

export function createLookupCalendarsAction(transport: PokeTransport): Action {
  return {
    name: "poke_list_calendars",
    similes: ["show calendars", "list calendars", "calendar lookup"],
    description: "List the user's calendars using Poke.",
    validate: async () => true,
    handler: async (runtime) => {
      const client = createPokeClient(runtime, transport);
      return await client.listCalendars();
    }
  };
}

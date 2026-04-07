import type { Provider } from "@elizaos/core";
import { createPokeClient } from "../client/pokeClient.js";
import type { PokeTransport } from "../types.js";

export function createCalendarContextProvider(transport: PokeTransport): Provider {
  return {
    name: "poke_calendar_context",
    description: "Calendar context from Poke",
    get: async (runtime) => {
      const client = createPokeClient(runtime, transport);
      const calendars = await client.listCalendars();

      return {
        data: {
          calendars
        }
      };
    }
  };
}

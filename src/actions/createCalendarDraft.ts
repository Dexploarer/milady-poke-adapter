import type { Action } from "@elizaos/core";
import { createPokeClient } from "../client/pokeClient.js";
import { calendarDraftTemplate } from "../templates/calendarDraftTemplate.js";
import type { PokeTransport } from "../types.js";

export function createCreateCalendarDraftAction(transport: PokeTransport): Action {
  return {
    name: "poke_create_calendar_draft",
    similes: ["schedule meeting", "create event draft", "calendar draft"],
    description: "Create a calendar event draft via Poke.",
    validate: async () => true,
    examples: [calendarDraftTemplate],
    handler: async (runtime, message) => {
      const client = createPokeClient(runtime, transport);
      const content = ((message as any)?.content ?? {}) as {
        event?: {
          type?: "new" | "update";
          title?: string;
          startDateTime?: string;
          endDateTime?: string;
          timezone?: string;
          attendees?: string[];
          description?: string;
          location?: string;
          addConference?: boolean;
          recurrence?: string[] | null;
          calendarId?: string;
        };
      };

      const event = content.event ?? {};

      return await client.createCalendarDraft({
        type: event.type ?? "new",
        title: event.title,
        startDateTime: event.startDateTime,
        endDateTime: event.endDateTime,
        timezone: event.timezone,
        attendees: event.attendees,
        description: event.description,
        location: event.location,
        addConference: event.addConference ?? false,
        recurrence: event.recurrence,
        calendarId: event.calendarId
      });
    }
  };
}

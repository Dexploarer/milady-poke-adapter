import type { Plugin } from "@elizaos/core";
import {
  createUnsupportedTransport,
  type PokeTransport
} from "./types.js";
import { createSearchEmailsAction } from "./actions/searchEmails.js";
import { createLookupCalendarsAction } from "./actions/lookupCalendars.js";
import { createCreateEmailDraftAction } from "./actions/createEmailDraft.js";
import { createCreateCalendarDraftAction } from "./actions/createCalendarDraft.js";
import { createCreateRecipeAction } from "./actions/createRecipe.js";
import { createManageIntegrationsAction } from "./actions/manageIntegrations.js";
import { createEmailContextProvider } from "./providers/emailContextProvider.js";
import { createCalendarContextProvider } from "./providers/calendarContextProvider.js";

export function createPokePlugin(transport: PokeTransport): Plugin {
  return {
    name: "milady-poke-adapter",
    description: "ElizaOS adapter for Poke email, calendar, recipe, and integration capabilities",
    actions: [
      createSearchEmailsAction(transport),
      createLookupCalendarsAction(transport),
      createCreateEmailDraftAction(transport),
      createCreateCalendarDraftAction(transport),
      createCreateRecipeAction(transport),
      createManageIntegrationsAction(transport)
    ],
    providers: [
      createEmailContextProvider(transport),
      createCalendarContextProvider(transport)
    ]
  };
}

export const PokePlugin = createPokePlugin(createUnsupportedTransport());

export default PokePlugin;

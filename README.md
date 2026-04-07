# milady-poke-adapter

ElizaOS adapter for Poke.

This repository scaffolds a plugin that exposes Poke capabilities as ElizaOS actions and providers:

- search email
- list calendars
- create email drafts
- create calendar drafts

## File structure

```text
src/
  index.ts
  types.ts
  client/pokeClient.ts
  actions/
    searchEmails.ts
    lookupCalendars.ts
    createEmailDraft.ts
    createCalendarDraft.ts
  providers/
    emailContextProvider.ts
    calendarContextProvider.ts
  templates/
    emailDraftTemplate.ts
    calendarDraftTemplate.ts
```

## How the adapter is wired

The plugin is built as a factory:

```ts
import { createPokePlugin } from "milady-poke-adapter";

const plugin = createPokePlugin({
  searchEmails: async ({ query, limit }) => {/* bridge to Poke */},
  listCalendars: async ({ userEmailAddressToSendFrom }) => {/* bridge to Poke */},
  createEmailDraft: async (input) => {/* bridge to Poke */},
  createCalendarDraft: async (input) => {/* bridge to Poke */}
});
```

If you want a runtime-safe placeholder, the default export uses a transport that throws a clear error until you inject a real Poke bridge.

## Environment

- `POKE_USER_EMAIL` — user mailbox address to use for draft and calendar operations

## Notes

The `PokeTransport` interface in `src/types.ts` is the integration point. Replace it with your actual transport implementation, whether that is:

- an internal Poke bridge
- an MCP-backed service layer
- a REST client that talks to your Poke deployment

## Scripts

```bash
npm install
npm run build
```

## Repository status

Created as `milady-poke-adapter` under the authenticated GitHub account.

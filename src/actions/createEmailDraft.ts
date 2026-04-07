import type { Action } from "@elizaos/core";
import { createPokeClient } from "../client/pokeClient.js";
import { emailDraftTemplate } from "../templates/emailDraftTemplate.js";
import type { PokeTransport } from "../types.js";

export function createCreateEmailDraftAction(transport: PokeTransport): Action {
  return {
    name: "poke_create_email_draft",
    similes: ["compose email", "draft email", "write reply"],
    description: "Create a Gmail draft via Poke.",
    validate: async () => true,
    examples: [emailDraftTemplate],
    handler: async (runtime, message) => {
      const client = createPokeClient(runtime, transport);
      const content = ((message as any)?.content ?? {}) as {
        draft?: {
          to?: string[];
          cc?: string[];
          bcc?: string[];
          body?: string;
          subject?: string;
          replyToEmailId?: string;
          forwardEmailId?: string;
        };
      };

      const draft = content.draft ?? {};

      return await client.createEmailDraft({
        to: draft.to ?? [],
        cc: draft.cc ?? [],
        bcc: draft.bcc ?? [],
        body: draft.body ?? "",
        subject: draft.subject,
        replyToEmailId: draft.replyToEmailId,
        forwardEmailId: draft.forwardEmailId
      });
    }
  };
}

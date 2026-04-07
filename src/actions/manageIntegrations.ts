import type { Action } from "@elizaos/core";
import { createPokeClient } from "../client/pokeClient.js";
import type { PokeTransport } from "../types.js";

export function createManageIntegrationsAction(transport: PokeTransport): Action {
  return {
    name: "poke_manage_integrations",
    similes: ["list integrations", "manage integrations", "connect integration", "disconnect integration"],
    description: "List or manage connected integrations through Poke.",
    validate: async () => true,
    handler: async (runtime, message) => {
      const client = createPokeClient(runtime, transport);
      const content = ((message as any)?.content ?? {}) as {
        integration?: {
          operation?: "list" | "connect" | "disconnect" | "enable" | "disable";
          integrationId?: string;
          integrationName?: string;
          provider?: string;
          description?: string;
          query?: string;
        };
      };

      const integration = content.integration ?? { operation: "list" as const };
      const operation = integration.operation ?? "list";

      if (operation === "list") {
        return await client.listIntegrations(integration.query);
      }

      if (!integration.integrationId && !integration.integrationName) {
        throw new Error(
          "poke_manage_integrations requires integration.integrationId or integration.integrationName for non-list operations."
        );
      }

      return await client.manageIntegration({
        operation,
        integrationId: integration.integrationId,
        integrationName: integration.integrationName,
        provider: integration.provider,
        description: integration.description
      });
    }
  };
}

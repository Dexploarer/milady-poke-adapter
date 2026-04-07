import type { Action } from "@elizaos/core";
import { createPokeClient } from "../client/pokeClient.js";
import type { PokeTransport } from "../types.js";

export function createCreateRecipeAction(transport: PokeTransport): Action {
  return {
    name: "poke_create_recipe",
    similes: ["share poke", "create recipe", "onboard someone"],
    description: "Create a Poke recipe link for another person.",
    validate: async () => true,
    handler: async (runtime, message) => {
      const client = createPokeClient(runtime, transport);
      const content = ((message as any)?.content ?? {}) as {
        recipe?: {
          name?: string;
          description?: string;
          context?: string;
        };
      };

      const recipe = content.recipe ?? {};

      if (!recipe.name || !recipe.description || !recipe.context) {
        throw new Error("poke_create_recipe requires recipe.name, recipe.description, and recipe.context.");
      }

      return await client.createRecipe({
        name: recipe.name,
        description: recipe.description,
        context: recipe.context
      });
    }
  };
}

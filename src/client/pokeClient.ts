import type {
  PokeCalendarDraftInput,
  PokeEmailDraftInput,
  PokeIntegrationActionInput,
  PokeRecipeInput,
  PokeTransport
} from "../types.js";

export class PokeClient {
  constructor(
    private readonly transport: PokeTransport,
    private readonly userEmailAddress: string
  ) {}

  async searchEmails(query: string, limit = 10) {
    return await this.transport.searchEmails({ query, limit });
  }

  async listCalendars() {
    return await this.transport.listCalendars({
      userEmailAddressToSendFrom: this.userEmailAddress
    });
  }

  async createEmailDraft(
    input: Omit<PokeEmailDraftInput, "userEmailAddressToSendFrom">
  ) {
    return await this.transport.createEmailDraft({
      ...input,
      userEmailAddressToSendFrom: this.userEmailAddress
    });
  }

  async createCalendarDraft(
    input: Omit<PokeCalendarDraftInput, "userEmailAddressToSendFrom">
  ) {
    return await this.transport.createCalendarDraft({
      ...input,
      userEmailAddressToSendFrom: this.userEmailAddress
    });
  }

  async createRecipe(input: PokeRecipeInput) {
    return await this.transport.createRecipe(input);
  }

  async listIntegrations(query?: string) {
    return await this.transport.listIntegrations({ query });
  }

  async manageIntegration(input: PokeIntegrationActionInput) {
    return await this.transport.manageIntegration(input);
  }
}

export function createPokeClient(runtime: any, transport: PokeTransport) {
  const userEmailAddress = runtime?.getSetting?.("POKE_USER_EMAIL");

  if (typeof userEmailAddress !== "string" || userEmailAddress.length === 0) {
    throw new Error("POKE_USER_EMAIL is required for the Poke adapter.");
  }

  return new PokeClient(transport, userEmailAddress);
}

export interface PokeEmailSearchResult {
  id: string;
  subject?: string;
  from?: string;
  snippet?: string;
  date?: string;
}

export interface PokeCalendarItem {
  id: string;
  title?: string;
  start?: string;
  end?: string;
  timezone?: string;
}

export interface PokeRecipeInput {
  name: string;
  description: string;
  context: string;
}

export interface PokeIntegrationItem {
  id: string;
  name: string;
  status?: string;
  provider?: string;
  description?: string;
}

export interface PokeIntegrationActionInput {
  operation: "list" | "connect" | "disconnect" | "enable" | "disable";
  integrationId?: string;
  integrationName?: string;
  provider?: string;
  description?: string;
}

export interface PokeEmailDraftInput {
  to: string[];
  cc?: string[];
  bcc?: string[];
  body?: string;
  subject?: string;
  replyToEmailId?: string;
  forwardEmailId?: string;
  userEmailAddressToSendFrom: string;
}

export interface PokeCalendarDraftInput {
  type: "new" | "update";
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
  userEmailAddressToSendFrom: string;
}

export interface PokeTransport {
  searchEmails(input: { query: string; limit: number }): Promise<unknown>;
  listCalendars(input: { userEmailAddressToSendFrom: string }): Promise<unknown>;
  createEmailDraft(input: PokeEmailDraftInput): Promise<unknown>;
  createCalendarDraft(input: PokeCalendarDraftInput): Promise<unknown>;
  createRecipe(input: PokeRecipeInput): Promise<unknown>;
  listIntegrations(input?: { query?: string }): Promise<unknown>;
  manageIntegration(input: PokeIntegrationActionInput): Promise<unknown>;
}

export function createUnsupportedTransport(): PokeTransport {
  const fail = (method: string) => {
    throw new Error(
      `Poke transport not configured. Provide a real transport implementation before calling ${method}.`
    );
  };

  return {
    async searchEmails() {
      fail("searchEmails");
    },
    async listCalendars() {
      fail("listCalendars");
    },
    async createEmailDraft() {
      fail("createEmailDraft");
    },
    async createCalendarDraft() {
      fail("createCalendarDraft");
    },
    async createRecipe() {
      fail("createRecipe");
    },
    async listIntegrations() {
      fail("listIntegrations");
    },
    async manageIntegration() {
      fail("manageIntegration");
    }
  };
}

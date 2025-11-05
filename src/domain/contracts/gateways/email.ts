export interface SendEmail {
  send(input: SendEmail.Input): Promise<void>;
}

export namespace SendEmail {
  export type Input = {
    token?: string;
    intentionReQuesterName: string;
    intentionReQuesterEmail: string;
  };
}

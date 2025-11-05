export interface CreateIntention {
  create(input: CreateIntention.Input): Promise<void>;
}

export namespace CreateIntention {
  export type Input = {
    name: string;
    email: string;
    company: string;
    text: string;
  };
}

export interface FetchIntention {
  fetch(): Promise<any[]>;
}

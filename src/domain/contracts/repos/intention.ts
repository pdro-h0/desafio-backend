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

export interface GetIntention {
  getById(input: GetIntention.Input): Promise<any | null>;
}
export namespace GetIntention {
  export type Input = {
    id: number;
  };
}

export interface ProcessIntention {
  process(input: ProcessIntention.Input): Promise<any>;
}
export namespace ProcessIntention {
  export type Input = {
    intention: any;
    status: string;
  };
}

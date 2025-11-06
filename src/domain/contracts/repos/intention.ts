import { Intention } from "@/domain/entities";

export interface CreateIntention {
  create(input: CreateIntention.Input): Promise<void>;
}

export namespace CreateIntention {
  export type Input = {
    name: string;
    email: string;
    companyName: string;
    text: string;
  };
}

export interface FetchIntention {
  fetch(): Promise<Intention[]>;
}

export interface GetIntention {
  getById(input: GetIntention.Input): Promise<Intention | null>;
}
export namespace GetIntention {
  export type Input = {
    id: number;
  };
}

export interface ProcessIntention {
  process(input: ProcessIntention.Input): Promise<Intention>;
}
export namespace ProcessIntention {
  export type Input = {
    intention: Intention;
    status: string;
  };
}

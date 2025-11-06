import { Member } from "@/domain/entities";

export interface CreateMember {
  create(input: CreateMember.Input): Promise<void>;
}

export namespace CreateMember {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };
}

export interface GetMember {
  getByEmail(input: GetMember.Input): Promise<Member | null>;
}
export namespace GetMember {
  export type Input = {
    email: string;
  };
}

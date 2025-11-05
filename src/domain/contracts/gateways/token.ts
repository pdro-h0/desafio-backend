export interface GenerateToken {
  generate(input: GenerateToken.Input): Promise<string>;
}
export namespace GenerateToken {
  export type Input = {
    key: string;
  };
}

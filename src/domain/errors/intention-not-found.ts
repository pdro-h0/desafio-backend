export class IntentioNotFound extends Error {
  constructor() {
    super("Intention not found");
    this.name = "IntentioNotFound";
  }
}

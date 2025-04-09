export class User {
    constructor(
      public lastName: string,
      public firstName: string,
      public username: string,
      public email: string,
      public password: string,
      public region: string,
      public address: string,
      public phoneNumber: string,
      public role: string,
      public proof: File,
      public description: string | null = null // description can null or a string
    ) {}
  }

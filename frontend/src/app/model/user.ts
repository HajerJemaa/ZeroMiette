export class User {
    constructor(
      public userId: number,
      public last_name: string,
      public first_name: string,
      public user_name: string,
      public email: string,
      public pwd: string,
      public region: string,
      public address: string,
      public number: string,
      public role: string,
      public proof: File,
      public description: string | null = null ,// description can null or a string
      public state:String,
      public mime:string
    ) {}
  }

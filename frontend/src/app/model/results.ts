import { User } from "./user";

export class Results {
    constructor(
            public message:String,
            public data:User[] | null = null
        ){}
}

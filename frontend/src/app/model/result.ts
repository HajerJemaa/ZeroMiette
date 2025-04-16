import { User } from "./user";

export class Result {
    constructor(
        public message:String,
        public data:User | null = null
    ){}
}

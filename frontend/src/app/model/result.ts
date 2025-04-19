import { User } from "./user";

export class Result {
    constructor(
        public message:string,
        public data:User | null = null
    ){}
}

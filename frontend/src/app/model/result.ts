import { Announcement } from "./announcement";
import { User } from "./user";

export class Result {
    constructor(
        public message:string,
        public data:User | User[] | Announcement | Announcement[] | Request | Request[] | null = null
    ){}
}

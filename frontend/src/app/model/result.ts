import { Announcement } from "./announcement";
import { User } from "./user";
import {Request} from "./request"
export class Result {
    constructor(
        public message:string,
        public data:User | User[] | Announcement | Announcement[] | Request | Request[] | null = null
    ){}
}

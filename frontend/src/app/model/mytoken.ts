export class Mytoken {
    constructor(
        public issAt:number,
        public exp:number,
        public userId:number,
        public role:string
    ){}
}

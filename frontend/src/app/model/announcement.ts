export class Announcement {
    constructor(
    public annCode: string,       // Code unique de l'annonce (clé primaire)
    public donId: number,         // ID du donneur (clé étrangère)
    public title: string ,
    public content: string,         // Contenu descriptif de l'annonce
    public quantity:string,
    public img: string | null=null,       // Image sous forme de blob (peut être null)
    public dateC: string,         // Date de création (timestamp en ISO string)
    public deadline: any,        // Heure limite (format 'HH:mm:ss')
    public state: 'expired' | 'available', // État de l'annonce
    public category: 'human' | 'animal'){}
}

export interface Announcement {
    annCode: string;         // Code unique de l'annonce (clé primaire)
    donId: number;           // ID du donneur (clé étrangère)
    title: string
    content: string;         // Contenu descriptif de l'annonce
<<<<<<< HEAD
    quantity:string
=======
>>>>>>> b3b1eb44337571faee42ca9e38faf60f1ec69209
    img: string | null;        // Image sous forme de blob (peut être null)
    dateC: string;           // Date de création (timestamp en ISO string)
    deadline: any;        // Heure limite (format 'HH:mm:ss')
    state: 'expired' | 'available'; // État de l'annonce
<<<<<<< HEAD
    category: 'human' | 'animal';
=======
    qte:number;
    title:string;
    category: 'animal' | 'human';
>>>>>>> b3b1eb44337571faee42ca9e38faf60f1ec69209
  }
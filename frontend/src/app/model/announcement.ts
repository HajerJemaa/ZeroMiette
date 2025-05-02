export interface Announcement {
    annCode: string;         // Code unique de l'annonce (clé primaire)
    donId: number;          // ID du donneur (clé étrangère)
    title: string;
    content: string;         // Contenu descriptif de l'annonce
    quantity:string;
    img: string | null;        // Image sous forme de blob (peut être null)
    dateC: string;           // Date de création (timestamp en ISO string)
    deadline: any;        // Heure limite (format 'HH:mm:ss')
    state: 'expired' | 'available'; // État de l'annonce
<<<<<<< HEAD
    category: 'human' | 'animal' ;
}
=======
    category: 'animal' | 'human';
  }
>>>>>>> 150a4a1849cecffd24f2772d401c3a7684c2c67f

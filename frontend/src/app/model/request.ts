export interface Request {
    annCode: number;
    userId: number;
    description: string;
    dateC: string;
    state: 'pending' | 'accepted' | 'refused';
    quantity: number;
  }
export interface Request {
  annCode: string;  
  userId: number;
  description: string;
  dateC: string;
  state: 'pending' | 'accepted' | 'refused';
  quantity: number;
}

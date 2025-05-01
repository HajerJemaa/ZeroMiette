

import { Request } from './request';

export interface RequestResponse {
  message: string;
  data: Request[]|null;
}

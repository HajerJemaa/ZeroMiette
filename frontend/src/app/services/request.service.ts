import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Request } from '../model/request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl = 'http://localhost/backend/request/getUserRequestsByState.php';

  http = inject(HttpClient);

  getUserRequestsByState(userId: number, state: string): Observable<Request[]> {
    const url = `${this.baseUrl}?userId=${userId}&state=${state}`;
    return this.http.get<Request[]>(url);
  }
}

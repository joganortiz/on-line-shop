import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private http = inject( HttpClient );
 // constructor(private http: HttpClient) { }

  getRoles({start, limit}: {start: number; limit: number}) {
    return this.http.get<any>('http://localhost:8080/api/v1/roles/', { params: {start, limit} }).pipe( delay(1000) )
  }
}

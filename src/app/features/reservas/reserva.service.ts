import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservaDto } from '../../models/reserva.dto';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private baseUrl = '/api/reserva';
  constructor(private http: HttpClient) {}

  getAll(): Observable<ReservaDto[]> {
    return this.http.get<ReservaDto[]>(this.baseUrl);
  }

  getById(id: number): Observable<ReservaDto> {
    return this.http.get<ReservaDto>(`${this.baseUrl}/${id}`);
  }

  create(dto: ReservaDto): Observable<ReservaDto> {
    return this.http.post<ReservaDto>(this.baseUrl, dto);
  }

  update(id: number, dto: ReservaDto): Observable<ReservaDto> {
    return this.http.put<ReservaDto>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

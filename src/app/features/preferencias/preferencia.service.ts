import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PreferenciaDto } from '../../models/preferencia.dto';

@Injectable({ providedIn: 'root' })
export class PreferenciaService {
  private baseUrl = '/api/preferencia';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PreferenciaDto[]> {
    return this.http.get<PreferenciaDto[]>(this.baseUrl);
  }

  create(dto: PreferenciaDto): Observable<PreferenciaDto> {
    return this.http.post<PreferenciaDto>(this.baseUrl, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}


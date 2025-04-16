import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelRecomendadoDto } from '../../models/hotel-recomendado.dto';

@Injectable({ providedIn: 'root' })
export class HotelService {
  private baseUrl = '/api/hotelRecomendado';
  constructor(private http: HttpClient) {}

  getAll(): Observable<HotelRecomendadoDto[]> {
    return this.http.get<HotelRecomendadoDto[]>(this.baseUrl);
  }

  create(dto: HotelRecomendadoDto): Observable<HotelRecomendadoDto> {
    return this.http.post<HotelRecomendadoDto>(this.baseUrl, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

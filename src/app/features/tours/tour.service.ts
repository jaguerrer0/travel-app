import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TourDto } from '../../models/tour.dto';

@Injectable({ providedIn: 'root' })
export class TourService {
  private baseUrl = '/api/tour';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TourDto[]> {
    return this.http.get<TourDto[]>(this.baseUrl);
  }

  getById(id: number): Observable<TourDto> {
    return this.http.get<TourDto>(`${this.baseUrl}/${id}`);
  }

  create(tour: TourDto): Observable<TourDto> {
    return this.http.post<TourDto>(this.baseUrl, tour);
  }

  update(id: number, tour: TourDto): Observable<TourDto> {
    return this.http.put<TourDto>(`${this.baseUrl}/${id}`, tour);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

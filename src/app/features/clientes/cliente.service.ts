import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClienteDto } from "../../models/cliente.dto";

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private baseUrl = '/api/cliente';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ClienteDto[]> {
    return this.http.get<ClienteDto[]>(this.baseUrl);
  }

  getById(id: number): Observable<ClienteDto> {
    return this.http.get<ClienteDto>(`${this.baseUrl}/${id}`);
  }

  create(dto: ClienteDto): Observable<ClienteDto> {
    return this.http.post<ClienteDto>(this.baseUrl, dto);
  }

  update(id: number, dto: ClienteDto): Observable<ClienteDto> {
    return this.http.put<ClienteDto>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

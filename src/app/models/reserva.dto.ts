// src/app/models/reserva.dto.ts
export interface ReservaDto {
    id?: number;
    clienteId: number;
    tourId: number;
    adultos: number;
    ninosMayores: number;
    fecha?: Date;
    notas?: string;
  }
  
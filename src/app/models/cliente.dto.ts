// src/app/models/cliente.dto.ts
export interface ClienteDto {
    id: string;
    nombre: string;
    correo: string;
    telefono: string;
    direccion: string;
    fechaRegistro: Date;
    notas?: string;
  }
  
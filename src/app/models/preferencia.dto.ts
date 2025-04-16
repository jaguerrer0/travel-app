export interface PreferenciaDto {
    id?: number;
    clienteId: number;
    categoria: string;      // Ej: "Playa", "Cultura", "Aventura"
    destinoFavorito: string;
    presupuestoMaximo: number;
    comentariosAdicionales?: string;
  }
  
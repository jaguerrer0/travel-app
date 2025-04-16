import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReservaDto } from '../../../models/reserva.dto';
import { ReservaService } from '../reserva.service';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent implements OnInit {
  reservas: ReservaDto[] = [];

  constructor(private service: ReservaService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((data: ReservaDto[]) => this.reservas = data);
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar esta reserva?')) {
      this.service.delete(id).subscribe(() => this.reservas = this.reservas.filter(r => r.id !== id));
    }
  }
}
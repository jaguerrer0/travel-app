import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { ClienteDto } from '../../../models/cliente.dto';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {
  clientes: ClienteDto[] = [];

  constructor(private service: ClienteService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(c => this.clientes = c);
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar este cliente?')) {
      this.service.delete(id).subscribe(() => this.clientes = this.clientes.filter(c => c.id !== id.toString()));
    }
  }
}
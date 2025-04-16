import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PreferenciaService } from '../preferencia.service';
import { PreferenciaDto } from '../../../models/preferencia.dto';

@Component({
  selector: 'app-preferencias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './preferencias.component.html',
  styleUrl: './preferencias.component.css',
  styles: [`.input { @apply w-full px-3 py-2 border rounded mb-3; }`]
})
export class PreferenciasComponent implements OnInit {
  preferencias: PreferenciaDto[] = [];
  form = this.fb.group({ tourId: [0], preferenciasTexto: [''] });

  constructor(private service: PreferenciaService, private fb: FormBuilder) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.service.getAll().subscribe(p => this.preferencias = p);
  }

  agregar() {
    const preferencia: PreferenciaDto = {
      ...this.form.value,
      clienteId: 0, // Provide default or actual values
      categoria: '',
      destinoFavorito: '',
      presupuestoMaximo: 0
    } as PreferenciaDto;

    this.service.create(preferencia).subscribe(() => {
      this.form.reset({ tourId: 0, preferenciasTexto: '' });
      this.cargar();
    });
  }

  eliminar(id: number) {
    this.service.delete(id).subscribe(() => this.preferencias = this.preferencias.filter(p => p.id !== id));
  }
}
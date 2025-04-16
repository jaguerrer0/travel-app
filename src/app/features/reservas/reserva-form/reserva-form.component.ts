import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReservaService } from '../reserva.service';
import { ReservaDto } from '../../../models/reserva.dto';

@Component({
  selector: 'app-reserva-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reserva-form.component.html',
  styleUrl: './reserva-form.component.css',
  styles: [`.input { @apply w-full px-3 py-2 border rounded mb-3; }`]
})
export class ReservaFormComponent implements OnInit {
  form = this.fb.group({
    clienteId: [0],
    tourId: [0],
    adultos: [0],
    ninosMayores: [0]
  });

  isEdit = false;
  id = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ReservaService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isEdit = !!this.id;

    if (this.isEdit) {
      this.service.getById(this.id).subscribe((r: Partial<{ clienteId: number | null; tourId: number | null; adultos: number | null; ninosMayores: number | null; }>) => this.form.patchValue(r));
    }
  }

  guardar() {
    const dto = this.form.value as ReservaDto;
    const obs = this.isEdit ? this.service.update(this.id, dto) : this.service.create(dto);
    obs.subscribe(() => this.router.navigate(['/reservas']));
  }
}
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TourService } from '../tour.service';
import { TourDto } from '../../../models/tour.dto';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  styles: [`.input { @apply w-full px-3 py-2 border rounded mb-3; }`]
})
export class FormComponent implements OnInit {
  form = this.fb.group({
    nombreTour: [''],
    etapa: [''],
    destino: [''],
    fechaInicio: [''],
    fechaFin: [''],
    presupuestoEstimado: [0]
  });

  isEdit = false;
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: TourService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isEdit = !!this.id;

    if (this.isEdit) {
      this.service.getById(this.id).subscribe(tour => {
        const transformedTour = {
          ...tour,
          fechaInicio: tour.fechaInicio?.toISOString().split('T')[0] || '',
          fechaFin: tour.fechaFin?.toISOString().split('T')[0] || '',
          presupuestoEstimado: Number(tour.presupuestoEstimado) || 0
        };
        this.form.patchValue(transformedTour);
      });
    }
  }

  guardar() {
    const dto: TourDto = {
      id: this.isEdit ? this.id.toString() : '0',
      nombre: this.form.value.nombreTour || '',
      descripcion: '', // Provide a default or fetch from another source
      precio: 0, // Provide a default or fetch from another source
      etapa: this.form.value.etapa || '',
      destino: this.form.value.destino || '',
      fechaInicio: this.form.value.fechaInicio ? new Date(this.form.value.fechaInicio) : new Date(),
      fechaFin: this.form.value.fechaFin ? new Date(this.form.value.fechaFin) : new Date(),
      presupuestoEstimado: (this.form.value.presupuestoEstimado || 0).toString()
    };
    const obs = this.isEdit ? this.service.update(this.id, dto) : this.service.create(dto);
    obs.subscribe(() => this.router.navigate(['/dashboard']));
  }
}
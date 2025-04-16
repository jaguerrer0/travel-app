import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { ClienteDto } from '../../../models/cliente.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css',
  styles: [`.input { @apply w-full px-3 py-2 border rounded mb-3; }`]
})
export class ClienteFormComponent implements OnInit {
  form = this.fb.group({
    nombre: [''],
    telefono: [''],
    correo: ['']
  });

  isEdit = false;
  id = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ClienteService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isEdit = !!this.id;

    if (this.isEdit) {
      this.service.getById(this.id).subscribe(c => this.form.patchValue(c));
    }
  }

  guardar() {
    const dto = this.form.value as ClienteDto;
    const obs = this.isEdit ? this.service.update(this.id, dto) : this.service.create(dto);
    obs.subscribe(() => this.router.navigate(['/clientes']));
  }
}
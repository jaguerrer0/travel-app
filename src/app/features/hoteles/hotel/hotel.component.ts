import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HotelService } from '../hotel.service';
import { HotelRecomendadoDto } from '../../../models/hotel-recomendado.dto';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'],
  styles: [`.input { @apply w-full px-3 py-2 border rounded mb-3; }`]
})
export class HotelComponent implements OnInit {
  hoteles: HotelRecomendadoDto[] = [];
  form = this.fb.group({ tourId: [0], nombreHotel: [''] });

  constructor(private service: HotelService, private fb: FormBuilder) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.service.getAll().subscribe(h => this.hoteles = h);
  }

  agregar() {
    const hotelData: HotelRecomendadoDto = {
      tourId: this.form.value.tourId || 0,
      nombreHotel: this.form.value.nombreHotel || ''
    };
    this.service.create(hotelData).subscribe(() => {
      this.form.reset({ tourId: 0, nombreHotel: '' });
      this.cargar();
    });
  }

  eliminar(id: number) {
    this.service.delete(id).subscribe(() => this.hoteles = this.hoteles.filter(h => h.id !== id));
  }
}
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TourService } from '../tour.service';
import { TourDto } from '../../../models/tour.dto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  tours: TourDto[] = [];

  constructor(private service: TourService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(t => this.tours = t);
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar este tour?')) {
      this.service.delete(id).subscribe(() => this.tours = this.tours.filter(t => t.id !== id.toString()));
    }
  }
}
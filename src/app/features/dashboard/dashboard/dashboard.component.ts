import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  stats = { tours: 0, clientes: 0, reservas: 0, totalPresupuesto: 0 };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('/api/dashboard').subscribe(data => this.stats = data);
  }
}
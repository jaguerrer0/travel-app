import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './shared/components/header/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  showHeader = false;

  constructor(private router: Router) {
    this.router.events
  .pipe(filter(event => event instanceof NavigationEnd))
  .subscribe(() => {
    const token = localStorage.getItem('token');
    const url = this.router.url;

    console.log('Token:', token);
    console.log('Ruta:', url);

    this.showHeader = !!token && !url.includes('login');
  });

  }
}

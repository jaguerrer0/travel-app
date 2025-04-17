import { Component, EventEmitter, Input, OnInit, Output, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() isDark: boolean = false;
  @Output() menuStateChanged = new EventEmitter<boolean>();
  @Output() themeToggled = new EventEmitter<boolean>();

  menuOpen = false;
  role: string | null = null;
  nombre: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.role = payload['role']?.toLowerCase();
      this.nombre = payload['name'] || payload['nombre'] || 'Usuario';
    }
  }

  toggleDarkMode(): void {
    this.themeToggled.emit(!this.isDark);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.menuStateChanged.emit(this.menuOpen);
  }

  closeMenu(): void {
    this.menuOpen = false;
    this.menuStateChanged.emit(false);
  }

  navigateAndClose(route: string): void {
    this.router.navigate([route]).then(() => this.closeMenu());
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const isInsideAside = clickedElement.closest('aside');
    const isHamburger = clickedElement.closest('button');

    if (!isInsideAside && !isHamburger && this.menuOpen) {
      this.closeMenu();
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

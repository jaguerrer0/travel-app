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
  menuOpen = false;
  isDarkTheme = false;

  constructor(private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const token = localStorage.getItem('token');
      const url = this.router.url;
      this.showHeader = !!token && !url.includes('login');
    });

    const theme = localStorage.getItem('theme');
    this.isDarkTheme = theme === 'dark';
    this.updateHtmlThemeClass();
  }

  onMenuStateChanged(open: boolean) {
    this.menuOpen = open;
  }

  onThemeToggled(isDark: boolean) {
    this.isDarkTheme = isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    this.updateHtmlThemeClass();
  }

  updateHtmlThemeClass() {
    document.documentElement.classList.toggle('dark', this.isDarkTheme);
  }
}

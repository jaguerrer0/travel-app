import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  styles: [`.input { @apply w-full px-3 py-2 border rounded; }`]
})
export class LoginComponent {
  form = this.fb.group({ username: [''], password: [''] });

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  login() {
    const { username, password } = this.form.value;
  
    // Usuario demo hardcodeado
    if (username === 'demo' && password === 'demo123') {
      const fakeToken = 'fake-jwt-token-demo';
  
      localStorage.setItem('token', fakeToken);
      this.router.navigate(['/tours']);
    } else {
      alert('Credenciales inválidas. Usa demo / demo123');
    }
  }
  
}
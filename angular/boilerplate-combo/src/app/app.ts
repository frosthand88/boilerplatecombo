// src/app/app.ts
import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  auth = inject(AuthService);
}

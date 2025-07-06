// src/app/app.ts
import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.html'
})
export class App {
  auth = inject(AuthService);
}

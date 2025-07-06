// src/app/callback.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-callback',
  template: `<p>Signing in...</p>`,
})
export class CallbackComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  async ngOnInit() {
    await this.auth.completeLogin();
    await this.router.navigateByUrl('/');
  }
}

// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { App } from './app';
import { CallbackComponent } from '../callback/callback.component';

export const routes: Routes = [
  { path: '', component: App },
  { path: 'callback', component: CallbackComponent },
];

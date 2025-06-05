import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../../global';

@Injectable({
  providedIn: 'root',
})
export class SuportServiceService {
  constructor() {}

  http = inject(HttpClient);

  enviarEmail(to: string, subject: string, text: string) {
    this.http.post(`${BASE_URL}/send-email`, {
      to: to,
      subject: subject,
      text: text,
      html: `<b>${text}</b>`,
    });
  }
}

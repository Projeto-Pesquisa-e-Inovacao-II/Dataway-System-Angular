import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [],
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent {
  @Input() nomeDoUsuario: string = '';
  @Input() mensagem: string = '';
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-cards',
  imports: [CommonModule],
  templateUrl: './home-cards.component.html',
  styleUrl: './home-cards.component.scss',
})
export class HomeCardsComponent {
  @Input()
  public concessao!: string;
  @Input()
  public periodo!: string;
  @Input()
  public veiculos!: number;
  @Input()
  public evasoes!: number;
  @Input()
  public impactoFinanceiro!: number;
  ngOnInit() {
    console.log(this.periodo);
  }
}

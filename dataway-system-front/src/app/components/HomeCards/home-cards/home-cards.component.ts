import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-cards',
  imports: [],
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
  public evasoes!: string;
  ngOnInit() {
    console.log(this.concessao);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartLine, faCircleUser, faHeadset } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {
  faChartLine = faChartLine;
  faCircleUser = faCircleUser;
  faHeadset = faHeadset;
}
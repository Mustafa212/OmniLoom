import { Component } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {
  options: AnimationOptions = {
    path: 'assets/lottie/sale.json',

  };
}

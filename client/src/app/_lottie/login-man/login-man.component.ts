import { Component } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-login-man',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './login-man.component.html',
  styleUrl: './login-man.component.css'
})
export class LoginManComponent {
  options: AnimationOptions = {
    path: 'assets/lottie/login.json',

  };
}

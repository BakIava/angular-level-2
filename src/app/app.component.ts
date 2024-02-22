import { StepperComponent } from './components/stepper/stepper.component';
import { Component } from '@angular/core';
import { ApiService } from './services/api/api.service';
import { RouterModule } from '@angular/router';
import { CarImageDirective } from './components/car-image/car-image.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StepperComponent, RouterModule, CarImageDirective],
  providers: [ApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() { }
}

import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ConfiguratorService } from "../../services/configurator/configurator.service";

@Component({
    selector: 'app-stepper',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './stepper.component.html',
    styleUrl: './stepper.component.scss'
})
export class StepperComponent {
    constructor(protected configurator: ConfiguratorService) { }
}
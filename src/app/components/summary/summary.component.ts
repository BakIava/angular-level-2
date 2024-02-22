import { CurrencyPipe, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { ConfiguratorService } from "../../services/configurator/configurator.service";

@Component({
    selector: 'app-summary',
    standalone: true,
    imports: [CurrencyPipe, NgIf],
    templateUrl: './summary.component.html',
    styleUrl: './summary.component.scss'
})
export class SummaryComponent {
    constructor(protected configurator: ConfiguratorService) { }
}
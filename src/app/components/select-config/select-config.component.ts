import { Component, OnDestroy, OnInit } from "@angular/core";
import { ApiService } from "../../services/api/api.service";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { CurrencyPipe, NgForOf, NgIf } from "@angular/common";
import { Option } from "../../services/api/model/Option";
import { ConfiguratorService } from "../../services/configurator/configurator.service";
import { Subscription, defer, firstValueFrom, map, retry } from "rxjs";

@Component({
    selector: 'app-select-config',
    standalone: true,
    imports: [ReactiveFormsModule, NgForOf, NgIf, CurrencyPipe],
    templateUrl: './select-config.component.html'
})
export class SelectConfigComponent implements OnInit, OnDestroy {
    configSelect: FormControl = new FormControl<number>(-1);
    configSubscription: Subscription;
    options: Option | undefined;

    towHitchControl: FormControl = new FormControl<boolean>(false);
    yorkControl: FormControl = new FormControl<boolean>(false);

    constructor(
        private api: ApiService,
        protected configurator: ConfiguratorService
    ) {
        this.configSubscription = this.configSelect.valueChanges
            .pipe(map(x => Number(x)))
            .subscribe((x: number) => {
                const config = this.options?.configs.find(c => c.id === x);
                configurator.config.set(config);
            });

        this.towHitchControl.valueChanges.subscribe((x: boolean) => {
            configurator.towHitch.set(x);
        });

        this.yorkControl.valueChanges.subscribe((x: boolean) => {
            configurator.york.set(x);
        });
    }

    ngOnInit() {
        this.loadConfig().then(() => this.loadConfigurator());
    }

    ngOnDestroy(): void {
        this.configSubscription.unsubscribe();
    }

    async loadConfig() {
        try {
            const response = await firstValueFrom(defer(() => this.api.getOptions(this.configurator.model()!.code))
                .pipe(retry({ count: 3, delay: 2000 })));
                this.options = response;
        } catch (error) {
            console.log(error);
        }
    }

    loadConfigurator() {
        this.configSelect.setValue(this.configurator.config()?.id || -1, { emitEvent: false });
        this.towHitchControl.setValue(this.configurator.towHitch(), { emitEvent: false });
        this.yorkControl.setValue(this.configurator.york(), { emitEvent: false });
    }
}
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ApiService } from "../../services/api/api.service";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import { Model } from "../../services/api/model/Model";
import { Color } from "../../services/api/model/Color";
import { ConfiguratorService } from "../../services/configurator/configurator.service";
import { Subscription, defer, firstValueFrom, retry } from "rxjs";

@Component({
    selector: 'app-select-model',
    standalone: true,
    imports: [ReactiveFormsModule, NgForOf, NgIf],
    templateUrl: './select-model.component.html',
    styleUrl: './select-model.component.scss'
})
export class SelectModelComponent implements OnInit, OnDestroy {
    modelSelect = new FormControl<string>('');
    modelSubscription: Subscription;
    colorSelect = new FormControl<string | undefined>(undefined);
    colorSubscription: Subscription;

    models: Model[] | undefined;
    colors: Color[] | undefined;

    constructor(
        private api: ApiService,
        private configurator: ConfiguratorService) {
        this.modelSubscription = this.modelSelect.valueChanges.subscribe(code => {
            const model = this.models?.find(x => x.code === code)
            configurator.model.set(model);

            this.colors = model?.colors;
            this.colorSelect.setValue(this.colors?.[0].code)
        });

        this.colorSubscription = this.colorSelect.valueChanges.subscribe(code => {
            const color = this.colors?.find(x => x.code === code);
            this.configurator.color.set(color);
        });
    }

    ngOnInit() {
        this.loadModels().then(() => this.loadConfigurator());
    }

    ngOnDestroy() {
        this.modelSubscription.unsubscribe();
        this.colorSubscription.unsubscribe();
    }

    async loadModels() {
        try {
            const response = await firstValueFrom(defer(() => this.api.getModels())
                .pipe(retry({ count: 3, delay: 2000 })));
            this.models = response;
        } catch (error) {
            console.log(error);
        }
    }

    loadConfigurator() {
        this.modelSelect.setValue(this.configurator.model()?.code || '', { emitEvent: false });
        this.colorSelect.setValue(this.configurator.color()?.code, { emitEvent: false });

        this.colors = this.configurator.model()?.colors;
    }
}
import {
    Injectable,
    OnDestroy,
    computed,
    signal
} from "@angular/core";
import { toObservable } from '@angular/core/rxjs-interop';
import { Config } from "../api/model/Config";
import { Model } from "../api/model/Model";
import { Color } from "../api/model/Color";
import { Subscription } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ConfiguratorService implements OnDestroy {
    model = signal<Model | undefined>(undefined);
    color = signal<Color | undefined>(undefined);
    step1Valid = computed<boolean>(() => this.model() !== undefined && this.color() !== undefined);

    config = signal<Config | undefined>(undefined);
    towHitch = signal<boolean>(false);
    york = signal<boolean>(false);
    step2Valid = computed<boolean>(() => this.step1Valid() && this.config() !== undefined);

    totalCost = computed<number>(() => {
        let costs = 0;

        costs += this.color()?.price || 0;
        costs += this.config()?.price || 0;
        costs += this.towHitch() ? 1000 : 0;
        costs += this.york() ? 1000 : 0;

        return costs;
    });

    modelSubscription: Subscription;
    configSubscription: Subscription;

    constructor() {
        this.modelSubscription = toObservable(this.model).subscribe(() => {
            this.config.set(undefined);
            this.towHitch.set(false);
            this.york.set(false);
        });

        this.configSubscription = toObservable(this.config).subscribe(() => {
            this.towHitch.set(false);
            this.york.set(false);
        });
    }

    ngOnDestroy(): void {
        this.modelSubscription.unsubscribe();
        this.configSubscription.unsubscribe();
    }
} 
import {
    Directive,
    EffectRef,
    ElementRef,
    OnDestroy,
    Signal,
    computed,
    effect
} from "@angular/core";
import { ConfiguratorService } from "../../services/configurator/configurator.service";

@Directive({
    selector: '[appCarImage]',
    standalone: true
})
export class CarImageDirective implements OnDestroy {

    effectRef: EffectRef;
    carImgSrc: Signal<string>;

    constructor(
        private el: ElementRef<HTMLImageElement>,
        private configurator: ConfiguratorService) {
        this.carImgSrc = computed(() => {
            const modelCode = this.configurator.model()?.code;
            const colorCode = this.configurator.color()?.code;

            if (!modelCode || !colorCode) return '';
            return `https://interstate21.com/tesla-app/images/${modelCode}/${colorCode}.jpg`;
        });

        this.effectRef = effect(() => {
            this.el.nativeElement.src = this.carImgSrc();
        });
    }

    ngOnDestroy() {
        this.effectRef.destroy();
    }
}
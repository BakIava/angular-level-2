import {
    Directive,
    EffectRef,
    ElementRef,
    HostBinding,
    HostListener,
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
            this.loading = true;
            return `https://interstate21.com/tesla-app/images/${modelCode}/${colorCode}.jpg`;
        });

        this.effectRef = effect(() => {
            this.el.nativeElement.src = this.carImgSrc();
        });
    }

    @HostBinding('class.loading')
    loading: boolean = false;

    @HostListener('load')
    load() {
        this.loading = false;
    }

    ngOnDestroy() {
        this.effectRef.destroy();
    }
}
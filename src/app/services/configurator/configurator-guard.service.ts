import { inject } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { ConfiguratorService } from "./configurator.service";
import { Observable } from "rxjs";

export const ConfiguratorGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
):
    Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree => {
    const configurator = inject(ConfiguratorService);
    const router = inject(Router);

    if (state.url === '/config' && !configurator.step1Valid()) {
        router.navigate(['/model']);
        return false;
    }

    if (state.url === '/summary' && !configurator.step2Valid()) {
        if (!configurator.step1Valid()) {
            router.navigate(['/model']);
            return false;
        }

        router.navigate(['/config']);
        return false;
    }

    return true;
};
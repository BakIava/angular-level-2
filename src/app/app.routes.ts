import { Routes } from '@angular/router';
import { SelectModelComponent } from './components/select-model/select-model.component';
import { SelectConfigComponent } from './components/select-config/select-config.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ConfiguratorGuard } from './services/configurator/configurator-guard.service';

export const routes: Routes = [
    {
        path: 'model',
        component: SelectModelComponent,
        title: 'Model | Tesla Configurator'
    },
    {
        path: 'config',
        component: SelectConfigComponent,
        canActivate: [ConfiguratorGuard],
        title: 'Config | Tesla Configurator'
    },
    {
        path: 'summary',
        component: SummaryComponent,
        canActivate: [ConfiguratorGuard],
        title: 'Summary | Tesla Configurator'
    },
    {
        path: '**',
        redirectTo: 'model'
    }
];

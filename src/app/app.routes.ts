

import { Routes } from '@angular/router';
import { PrivateContentFull } from './layout/private/content-full/content-full';
import { Gratuidad } from './features/constancias/gratuidad/gratuidad';


export const routes: Routes = [

    {
        path: 'private',
        component: PrivateContentFull,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'formulario-constancia-gratuidad' },
            { path: 'formulario-constancia-gratuidad', component: Gratuidad },
        ]
    },
    {
        path: '**',
        redirectTo: 'private'
    }

];


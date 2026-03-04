import { Routes } from '@angular/router';
import { Tasklist } from './components/tasklist/tasklist';
import { Options } from './components/options/options';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
    {path: 'tasklist', component: Tasklist},
    {path: 'options', component: Options},
    {path: 'dashboard',component: Dashboard}
];

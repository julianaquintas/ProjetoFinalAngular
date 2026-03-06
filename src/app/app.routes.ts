import { Routes } from '@angular/router';
import { Tasklist } from './components/tasklist/tasklist';
import { Options } from './components/options/options';
import { Dashboard } from './components/dashboard/dashboard';
import { Taskform } from './components/taskform/taskform';
import { Detail } from './components/detail/detail';

export const routes: Routes = [
    {path: 'tasklist', component: Tasklist},
    {path: 'options', component: Options},
    {path: 'dashboard',component: Dashboard},
    {path: 'add-task', component: Taskform},
    {path: 'detail/:id', component: Detail}
];

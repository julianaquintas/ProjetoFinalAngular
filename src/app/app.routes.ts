import { Routes } from '@angular/router';
import { Tasklist } from './components/tasklist/tasklist';
import { Options } from './components/options/options';
import { Dashboard } from './components/dashboard/dashboard';
import { Taskform } from './components/taskform/taskform';
import { Detail } from './components/detail/detail';
import { AddSubject } from './components/add-subject/add-subject';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

export const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path: 'tasklist', component: Tasklist},
    {path: 'options', component: Options},
    {path: 'dashboard',component: Dashboard},
    {path: 'add-task', component: Taskform},
    {path: 'detail/:id', component: Detail},
    {path: 'add-subject', component: AddSubject},
    {path: 'login', component: Login},
    {path: 'register', component: Register}
];

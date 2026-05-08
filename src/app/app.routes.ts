import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { Projects } from './features/projects/projects';
import { Tasks } from './features/tasks/tasks';
import { Users } from './features/users/users';

export const routes: Routes = [
    { path: '', redirectTo: "dashboard", pathMatch: "full" },
    { path: "dashboard", component: Dashboard },
    { path: "projects", component: Projects },
    { path: "tasks", component: Tasks },
    { path: "users", component: Users }
];

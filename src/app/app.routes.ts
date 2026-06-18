import { Routes } from '@angular/router';
import { ProjectsList } from './features/projects/pages/projects-list/projects-list';
import { DashboardHome } from './features/dashboard/pages/dashboard-home/dashboard-home';
import { TaskList } from './features/tasks/pages/task-list/task-list';
import { Team } from './features/team/team';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { authGuard } from './core/guards/auth-guard';
import { ProjectDetails } from './features/projects/pages/project-details/project-details';
import { ProjectTeam } from './features/projects/pages/project-team/project-team';
import { ClientsList } from './features/clients/clients-list/clients-list';
import { Reaports } from './features/clients/reaports/reaports';
import { Setting } from './features/setting/setting/setting';
import { ClientDetails } from './features/clients/client-details/client-details';
import { MainLayout } from './core/layouts/main-layout/main-layout';

export const routes: Routes = [
    {
        path: "", component: MainLayout, canActivate: [authGuard],
        children: [
            { path: "dashboard", component: DashboardHome, },
            { path: "projects-list", component: ProjectsList },
            { path: "project-details/:id/:projectName", component: ProjectDetails },
            { path: "project-team-list", component: ProjectTeam },
            { path: "task-list", component: TaskList },
            { path: "team-list", component: Team },
            { path: "clients-list", component: ClientsList },
            { path: "clients-detalis", component: ClientDetails },
            { path: "reaports", component: Reaports },
            { path: "setting", component: Setting },
        ]
    },
    { path: "login", component: Login },
    { path: "register", component: Register }

];

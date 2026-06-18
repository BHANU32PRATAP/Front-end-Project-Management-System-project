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
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
    {
        path: "", component: MainLayout, canActivate: [authGuard],
        children: [
            { path: "dashboard", component: DashboardHome, canActivate: [authGuard] },
            {
                path: "projects-list", component: ProjectsList, canActivate: [authGuard, roleGuard],
                data: { roles: ["Admin", "Project Manager"], }
            },
            {
                path: "project-details/:id/:projectName", component: ProjectDetails, canActivate: [authGuard, roleGuard],
                data: { roles: ["Admin", "Project Manager"] }
            },
            {
                path: "project-team-list", component: ProjectTeam, canActivate: [authGuard, roleGuard],
                data: { roles: ["Admin"] }
            },
            {
                path: "task-list", component: TaskList, canActivate: [authGuard, roleGuard],
                data: { roles: ["Admin", "Project Manager", "Employee"] }
            },
            {
                path: "team-list", component: Team, canActivate: [authGuard],
                data: { roles: ["Admin", "HR"] }
            },
            {
                path: "clients-list", component: ClientsList, canActivate: [authGuard, roleGuard],
                data: { roles: ["Admin"] }
            },
            {
                path: "clients-detalis", component: ClientDetails, canActivate: [authGuard, roleGuard],
                data: { roles: ["Admin"] }
            },
            {
                path: "reaports", component: Reaports, canActivate: [authGuard, roleGuard],
                data: { roles: ["Admin"] }
            },
            {
                path: "setting", component: Setting, canActivate: [authGuard, roleGuard],
                data: { roles: ["Admin"] }
            },
        ]
    },
    { path: "login", component: Login },
    { path: "register", component: Register }

];

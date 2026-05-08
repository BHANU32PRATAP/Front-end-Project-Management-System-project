import { Component } from '@angular/core';
import { Dashboard } from '../../features/dashboard/dashboard';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  sideBar =
    [
      {
        sidebarIcon: "🏠",
        sideBarName: "Dashboard",
        link: "dashboard"
      },
      {
        sidebarIcon: "📋",
        sideBarName: "Projects",
        link: "projects"
      },
      {
        sidebarIcon: "✅",
        sideBarName: "Tasks",
        link: "tasks"
      },
      {
        sidebarIcon: "👥",
        sideBarName: "Users",
        link: "users"
      }
    ]

}
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {


  sideBar = [
    { icon: "🏠", routingName: "Dashboard", route: "/dashboard" },
    { icon: "📁", routingName: "Projects", route: "/projects-list" },
    { icon: "📋", routingName: "Tasks", route: "task-list" },
    { icon: "👥", routingName: "Team", route: "team-list" },
    { icon: "🤝", routingName: "Clients", route: "" },
    { icon: "📊", routingName: "Reaports", route: "" },
    { icon: "⚙️", routingName: "Setting", route: "" },
  ]
}

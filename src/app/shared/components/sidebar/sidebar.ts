import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { it } from 'node:test';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  userRole = JSON.parse(localStorage.getItem("userData")!).role
  private router = inject(Router)

  sideBar = [
    {
      icon: "🏠",
      routingName: "Dashboard",
      route: "/dashboard",
      roles: ["Admin", "Project Manager", "Employee"]
    },
    {
      icon: "📁",
      routingName: "Projects",
      route: "/projects-list",
      roles: ["Admin", "Project Manager"]
    },
    {
      icon: "📋",
      routingName: "Tasks",
      route: "/task-list",
      roles: ["Admin", "Project Manager", "Employee"]
    },
    {
      icon: "👥",
      routingName: "Team",
      route: "/team-list",
      roles: ["Admin", "hr"]
    },
    {
      icon: "🤝",
      routingName: "Clients",
      route: "/clients-list",
      roles: ["Admin"]
    },
    {
      icon: "📊",
      routingName: "Reports",
      route: "/reaports",
      roles: ["Admin"]
    },
    {
      icon: "⚙️",
      routingName: "Settings",
      route: "/setting",
      roles: ["Admin"]
    }
  ]

  filterSideBar = this.sideBar.filter((item) => {
    return item.roles.includes(this.userRole)
  })


  get userLoggedIn(): boolean {
    return !!localStorage.getItem("token")
  }

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("userData");
    this.router.navigate(["/login"])
  }

}

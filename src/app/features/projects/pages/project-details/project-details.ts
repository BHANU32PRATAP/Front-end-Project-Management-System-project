import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ProjectMember {
  name: string;
  role: string;
  email: string;
  avatar: string;
}

interface ProjectTask {
  title: string;
  dueDate: string;
  assignee: string;
  status: string;
  progress: string;
}

interface ProjectDetail {
  id: number;
  projectName: string;
  client: string;
  manager: string;
  budget: string;
  startDate: string;
  deadline: string;
  progress: number;
  status: string;
  category: string;
  priority: string;
  description: string;
  team: ProjectMember[];
  tasks: ProjectTask[];
  totalTasks: number;
  completedTasks: number;
  openTasks: number;
  hoursBudgeted: string;
  hoursSpent: string;
  remainingDays: number;
}

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css',
})
export class ProjectDetails {

  project = {
    id: 1,
    projectName: 'Project Management System',

    description:
      'A complete enterprise-level Project Management System built using Angular 21, Node.js, Express.js, and MongoDB. The platform includes project tracking, task management, team collaboration, reporting, notifications, and analytics.',

    status: 'In Progress',

    progress: 75,

    budget: '₹5,00,000',

    startDate: '2026-08-01',

    deadline: '2026-12-31',

    remainingDays: 120,

    client: 'Tech Solutions Pvt Ltd',

    manager: 'Bhanu Pratap',

    category: 'Web Application',

    priority: 'High',

    totalTasks: 48,

    completedTasks: 36,

    openTasks: 12,

    hoursBudgeted: 1200,

    hoursSpent: 850,

    team: [
      {
        id: 1,
        avatar: 'BP',
        name: 'Bhanu Pratap',
        role: 'Project Manager',
        email: 'bhanu@gmail.com'
      },
      {
        id: 2,
        avatar: 'AK',
        name: 'Aman Kumar',
        role: 'Frontend Developer',
        email: 'aman@gmail.com'
      },
      {
        id: 3,
        avatar: 'RS',
        name: 'Rahul Sharma',
        role: 'Backend Developer',
        email: 'rahul@gmail.com'
      },
      {
        id: 4,
        avatar: 'PK',
        name: 'Priya Kumari',
        role: 'UI/UX Designer',
        email: 'priya@gmail.com'
      }
    ],

    tasks: [
      {
        id: 1,
        title: 'Authentication Module',
        assignee: 'Rahul Sharma',
        dueDate: '2026-08-15',
        status: 'Completed',
        progress: 100
      },
      {
        id: 2,
        title: 'Dashboard Design',
        assignee: 'Priya Kumari',
        dueDate: '2026-08-20',
        status: 'Completed',
        progress: 100
      },
      {
        id: 3,
        title: 'Project Management CRUD',
        assignee: 'Aman Kumar',
        dueDate: '2026-08-30',
        status: 'In Progress',
        progress: 70
      },
      {
        id: 4,
        title: 'Task Module',
        assignee: 'Rahul Sharma',
        dueDate: '2026-09-05',
        status: 'In Progress',
        progress: 55
      },
      {
        id: 5,
        title: 'Reports & Analytics',
        assignee: 'Bhanu Pratap',
        dueDate: '2026-09-15',
        status: 'Pending',
        progress: 20
      }
    ],

    documents: [
      {
        id: 1,
        name: 'Requirements.pdf',
        type: 'PDF',
        size: '2.5 MB'
      },
      {
        id: 2,
        name: 'Project-Plan.xlsx',
        type: 'Excel',
        size: '1.2 MB'
      },
      {
        id: 3,
        name: 'UI-Design.fig',
        type: 'Figma',
        size: '5.8 MB'
      }
    ],

    activities: [
      {
        id: 1,
        title: 'Project Created',
        date: '2026-08-01',
        user: 'Bhanu Pratap'
      },
      {
        id: 2,
        title: 'Team Assigned',
        date: '2026-08-03',
        user: 'Bhanu Pratap'
      },
      {
        id: 3,
        title: 'Dashboard Module Completed',
        date: '2026-08-18',
        user: 'Priya Kumari'
      },
      {
        id: 4,
        title: 'Authentication Module Completed',
        date: '2026-08-20',
        user: 'Rahul Sharma'
      }
    ]
  };


}

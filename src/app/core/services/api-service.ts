import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient)
  // apiUrl = "http://localhost:5000/api"
  apiUrl = "https://backend-project-management-system-project.onrender.com/api"


  //////////Project API's
  getTotalProject() {
    return this.http.get(`${this.apiUrl}/projects/project-list`)
  }

  getAllProject(page: number = 1, limit: number = 10, search: string = "", status: string = "", priority: string = "") {
    return this.http.get(`${this.apiUrl}/projects/project-list`, {
      params: { page, limit, search, status, priority }
    })
  }

  deleteProjectById(id: any) {
    return this.http.delete(`${this.apiUrl}/projects/delete-project/${id}`)
  }

  // /task/task-list
  ////Task API's///////

  getAllTask(page: number = 1, limit: number = 10, search: string = "", status: string = "", priority: string = "") {
    return this.http.get(`${this.apiUrl}/tasks/task-list`, {
      params: { page, limit, search, status, priority }
    })
  }





}

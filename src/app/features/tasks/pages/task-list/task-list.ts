import { Component, inject } from '@angular/core';
import { ApiService } from '../../../../core/services/api-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  searchTask = new Subject<string>()
  private destroy$ = new Subject<void>()
  private apiService = inject(ApiService)

  projectNameLength: number = 10
  decriptionStringLength: number = 20
  taskList: any[] = []
  taskLength: Number = 0
  tasksummaryCard: any[] = []
  headerNames: string[] = ["Task Name", "Description", "Project", "Priority", "Status", "Progress", "Start Date", "Deadline", "Est. Hours", "Actual Hours",]


  currentPage: number = 2;
  limit = 3;
  searchValue = ""
  selectStatus = ""
  selectPriority = ""

  ngOnInit() {
    this.searchTask.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((value: string) => {
      console.log(value)
      this.searchValue = value
      this.currentPage = 1
      this.getTaskList()
    })
    this.getTaskList()
  }


  getTaskList() {
    this.apiService.getAllTask(this.currentPage, this.limit, this.searchValue, this.selectStatus, this.selectPriority).subscribe({
      next: (res: any) => {
        this.taskLength = res.totalTask
        console.log("task length", this.taskLength)
        this.taskList = res.data
        console.log(this.taskList)
        this.taskCardsSummer()
      }
    })
  }

  onSearchTask(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchedValue = input.value
    this.searchTask.next(searchedValue)
  }

  onChnageStatus(status: string) {
    console.log(status)
    this.selectStatus = status
    this.currentPage = 1
    this.getTaskList()
  }
  onChnagePriority(priority: string) {
    console.log(priority)
    this.selectStatus = priority
    this.currentPage = 1
    this.getTaskList()
  }

  onDeleteTask() {

  }


  taskCardsSummer() {
    const highCount = this.taskList.filter((item: any) => item.priority === "High").length
    const mediumCount = this.taskList.filter((item: any) => item.priority === "Medium").length
    const CriticalCount = this.taskList.filter((item: any) => item.priority === "Critical").length

    const TodoCount = this.taskList.filter((item: any) => item.status === "Todo").length
    const inProgressCount = this.taskList.filter((item: any) => item.status === "In Progress").length
    const completedCount = this.taskList.filter((item: any) => item.status === "Completed").length
    const blockedCount = this.taskList.filter((item: any) => item.status === "Blocked").length


    this.tasksummaryCard = [
      {
        title: "Total Projects",
        count: this.taskLength,
        icon: "pi pi-briefcase"
      },
      {
        title: "Active Projects",
        count: TodoCount,
        icon: "pi pi-play-circle"
      },
      {
        title: "Progress Projects",
        count: inProgressCount,
        icon: "pi pi-spin pi-spinner"
      },
      {
        title: "Blocked Projects",
        count: blockedCount,
        icon: "pi pi-clock"
      },
      {
        title: "Completed",
        count: completedCount,
        icon: "pi pi-check-circle"
      },
      {
        title: "High Priority",
        count: highCount,
        icon: "pi pi-arrow-up"
      },
      {
        title: "Critical Priority",
        count: CriticalCount,
        icon: "pi pi-exclamation-triangle"
      },
      {
        title: "Medium Priority",
        count: mediumCount,
        icon: "pi pi-minus-circle"
      }
    ]
  }

}

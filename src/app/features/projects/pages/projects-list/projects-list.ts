import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { ApiService } from '../../../../core/services/api-service';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './projects-list.html',
  styleUrl: './projects-list.css',
})
export class ProjectsList {
  projectNameStringLenght: number = 15
  clientNameStringLength: number = 15
  managerStringLength: number = 10
  cardString: number = 30
  viewMode: 'table' | 'cards' = 'table'
  truncateLength: number = 20

  totalPages = 0
  totalProjectList: [] = []
  selectStatus = ""
  selectPriority = ""
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage = 1
  limit = 2
  searchValue = ""
  searchProject = new Subject<string>()
  private destroy$ = new Subject<void>()
  private ApiService = inject(ApiService)
  projectListheader = [
    { label: "project Code", key: "projectCode" },
    { label: "project name", key: "projectName" },
    { label: "client", key: "client" },
    { label: "manager", key: "manager" },
    { label: "budget", key: "budget" },
    { label: "start Date", key: "startDate" },
    { label: "deadline", key: "deadline" },
    { label: "progress", key: "progress" },
    { label: "status", key: "status" },
    { label: "prority", key: "prority" }
  ]
  projectList = []
  summaryCard: any[] = []
  filteredProjectList: any[] = []
  activeCount = this.projectList.filter((item: any) => item.status === "Active").length
  pendingCount = this.projectList.filter((item: any) => item.status === "Pending").length
  completedCount = this.projectList.filter((item: any) => item.status === "Completed").length


  ngOnInit(): void {
    this.totalProjectCard()
    this.filteredProjectList = [...this.projectList]
    this.searchProject.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((value: string) => {
      console.log(value)
      this.searchValue = value
      this.currentPage = 1
      this.getAllProjectList()
    })
    this.getAllProjectList()
  }

  getAllProjectList() {
    this.ApiService.getAllProject(this.currentPage, this.limit, this.searchValue, this.selectStatus, this.selectPriority).subscribe({
      next: (res: any) => {

        this.projectList = res.data
        this.totalPages = res.totalPages;
        this.filteredProjectList = [...res.data]

        this.updateSummaryCard()
      },
      error: (error) => {
        console.log("Error", error)
      }
    })
  }

  onSearchBy(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchedValue = input.value;
    this.searchProject.next(searchedValue);
  }

  onStatusChanges(status: string) {
    console.log("STATUS CHANGE");
    this.selectStatus = status
    this.currentPage = 1
    this.getAllProjectList()
  }

  onViewChanges(priority: string) {
    console.log("selectPriority ", priority)
    this.selectPriority = priority
    this.currentPage = 1
    this.getAllProjectList()

  }

  onDeleted(objectId: string) {
    this.projectList = this.projectList.filter(
      (item: any) => item._id !== objectId)
    this.filteredProjectList = [...this.projectList]
  }

  onDeletedById(id: string) {
    // Optimistically remove from UI first
    this.onDeleted(id)

    this.ApiService.deleteProjectById(id).subscribe({
      next: (res: any) => {
        console.log(res)
        alert(res.message)
        // Refresh from server to ensure consistency
        this.getAllProjectList()
      },
      error: (error) => {
        // revert UI removal on error: refetch full list
        this.getAllProjectList()
        console.error(error?.error?.message || "Something went wrong")
      }
    })
  }


  nextPage() {
    console.log(
      "Current:",
      this.currentPage,
      "Total:",
      this.totalPages
    );
    if (this.currentPage < this.totalPages) {
      this.currentPage++
      console.log("next button", this.currentPage)
      this.getAllProjectList()
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      console.log("prv button", this.currentPage)
      this.currentPage--
      this.getAllProjectList()
    }
  }



  totalProjectCard() {
    this.ApiService.getAllProject().subscribe({
      next: (res: any) => {
        this.totalProjectList = res.data
      }
    })
  }



  updateSummaryCard() {
    const progressCount = this.totalProjectList.filter((item: any) => item.status === "In Progress").length
    const pendingCount = this.totalProjectList.filter((item: any) => item.status === "Pending").length
    const completedCount = this.totalProjectList.filter((item: any) => item.status === "Completed").length
    const activeCount = this.totalProjectList.filter((item: any) => item.status === "Active").length
    const HighCount = this.totalProjectList.filter((item: any) => item.priority === "High").length
    const criticalCount = this.totalProjectList.filter((item: any) => item.priority === "Critical").length
    const lowCount = this.totalProjectList.filter((item: any) => item.priority === "Low").length
    const mediumCount = this.totalProjectList.filter((item: any) => item.priority === "Medium").length


    this.summaryCard = [
      {
        title: "Total Projects",
        count: this.totalProjectList.length,
        icon: "pi pi-briefcase"
      },
      {
        title: "Active Projects",
        count: activeCount,
        icon: "pi pi-play-circle"
      },
      {
        title: "Progress Projects",
        count: progressCount,
        icon: "pi pi-spin pi-spinner"
      },
      {
        title: "Pending Projects",
        count: pendingCount,
        icon: "pi pi-clock"
      },
      {
        title: "Completed",
        count: completedCount,
        icon: "pi pi-check-circle"
      },
      {
        title: "High Priority",
        count: HighCount,
        icon: "pi pi-arrow-up"
      },
      {
        title: "Critical Priority",
        count: criticalCount,
        icon: "pi pi-exclamation-triangle"
      },
      {
        title: "Low Priority",
        count: lowCount,
        icon: "pi pi-arrow-down"
      },
      {
        title: "Medium Priority",
        count: mediumCount,
        icon: "pi pi-minus-circle"
      }
    ];
  }



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  onAlphabet(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    const sortedData = [...this.filteredProjectList];
    sortedData.sort((a: any, b: any) => {
      const valueA = String(a[column] ?? '').toLowerCase();
      const valueB = String(b[column] ?? '').toLowerCase();
      return this.sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });

    this.filteredProjectList = sortedData
  }


  getSortIcon(column: string): string {
    if (this.sortColumn !== column) {
      return 'pi pi-sort-alt';
    }

    return this.sortDirection === 'asc'
      ? 'pi pi-sort-up'
      : 'pi pi-sort-down';
  }




  getStatusColor(status: string): string {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-700";

      case "Pending":
        return "bg-amber-100 text-amber-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Completed":
        return "bg-slate-200 text-slate-700";

      default:
        return "";
    }
  }

  getColorPriority(prority: string): string {
    switch (prority) {
      case "Critical":
        return "bg-red-100 text-red-700";

      case "High":
        return "bg-orange-100 text-orange-700";

      case "Low":
        return "bg-yellow-100 text-yellow-700";

      case "Medium":
        return "bg-green-100 text-green-700";

      default:
        return "bg-slate-100 text-slate-700"
    }
  }


}
